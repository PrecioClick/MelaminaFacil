
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { prices, downloads } = require("../../products.config");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

exports.handler = async (event) => {
  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId) return { statusCode: 400, body: "Falta session_id" };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price"]
    });

    if (session.payment_status !== "paid") {
      return { statusCode: 402, body: "Pago no completado" };
    }

    const priceId = session.line_items?.data?.[0]?.price?.id;
    const productKey = Object.keys(prices).find((k) => prices[k] === priceId);
    if (!productKey || !downloads[productKey]) {
      return { statusCode: 404, body: "Producto no encontrado" };
    }

    const files = downloads[productKey];
    const signed = await Promise.all(
      files.map(async (f) => {
        const cmd = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: f.key
        });
        const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 15 });
        return { label: f.label, url };
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ product: productKey, links: signed })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Error verificando la compra" };
  }
};
