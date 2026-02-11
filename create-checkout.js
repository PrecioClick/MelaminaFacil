
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { prices } = require("../../products.config");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { product } = JSON.parse(event.body || "{}");
    if (!product || !prices[product]) {
      return { statusCode: 400, body: "Producto inválido" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: prices[product], quantity: 1 }],
      success_url: `${process.env.SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/cancel.html`,
      metadata: { product }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Error creando la sesión" };
  }
};
