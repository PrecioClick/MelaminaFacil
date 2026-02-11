
# Melamina Fácil – Sitio estático + pagos Stripe en Netlify

## 1) Requisitos
- Cuenta Netlify
- Cuenta Stripe (modo prueba)
- AWS S3 (bucket privado) para alojar los archivos premium

## 2) Configuración de Stripe
- Crea **Precios (Prices)** en Stripe para cada producto:
  - VELADOR_40, MUEBLE_60, CLOSET_80, REPISA, ESCRITORIO
- Copia los **price_id** (ej: `price_123`) y colócalos como variables de entorno en Netlify:
  - `PRICE_VELADOR_40`, `PRICE_MUEBLE_60`, `PRICE_CLOSET_80`, `PRICE_REPISA`, `PRICE_ESCRITORIO`
- Crea la variable `STRIPE_SECRET_KEY` (tu clave secreta)
- Crea `SITE_URL` con la URL de tu sitio (ej: `https://tu-sitio.netlify.app`)

## 3) Configuración de AWS S3
- Crea un bucket privado (ej: `melamina-premium`)
- Sube los archivos en rutas como:
  - `premium/velador40/velador40.skp`
  - `premium/velador40/velador40_planos.pdf`
- Variables de entorno en Netlify:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION` (ej: `us-east-1`)
  - `S3_BUCKET` (nombre del bucket)

## 4) Despliegue en Netlify
- Sube este repositorio a GitHub
- En Netlify: **New site from Git →** conecta el repo
- Build command: *(vacío)* o `npm run build`
- Publish directory: `.` (raíz)
- Node version: `18` (en `netlify.toml` ya está)
- Añade **todas** las variables de entorno indicadas

## 5) Pruebas
- En `disenos.html`, compra en **modo prueba** (Stripe)
- Tras el pago, llegarás a `/success.html?session_id=...`
- Ahí se validará el pago y verás los **enlaces pre‑firmados** para descargar.

## 6) Personalización
- Cambia textos, precios y thumbnails de productos
- Reemplaza los iframes de YouTube por los videos que prefieras
- Ajusta colores en `assets/css/style.css`

## 7) Seguridad
- Los archivos premium **no** están públicos en Netlify; viven en S3 privado
- Las URLs pre‑firmadas caducan (15 min). Puedes ajustar `expiresIn`

## 8) Soporte
- Si algo falla, revisa la consola de Netlify Functions (logs)
- Confirma que tus PRICE IDs coinciden con los de Stripe
