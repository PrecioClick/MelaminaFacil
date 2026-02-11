// =======================================
// CONFIGURACIÓN
// =======================================
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQf9wSKjxzcVv97PeGixZlGTpV5mH994gnt6Swt1Dinn1omXRYRGUS743alxNREPrG1cq4TMljycudp/pub?gid=0&single=true&output=csv";

let usuarios = [];
let csvCargado = false;

// =======================================
// CARGAR USUARIOS DESDE CSV
// =======================================
fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {

    const lineas = text
      .replace(/\r/g, "")
      .split("\n")
      .map(l => l.trim())
      .filter(l => l !== "");

    lineas.shift();

    usuarios = lineas.map(linea => {
      let partes;

      if (linea.includes("\t")) partes = linea.split("\t");
      else if (linea.includes(",")) partes = linea.split(",");
      else if (linea.includes(";")) partes = linea.split(";");
      else partes = linea.split("/");

      return {
        user: partes[0]?.trim(),
        pass: partes[1]?.trim()
      };
    });

    csvCargado = true;
    console.log("Usuarios cargados:", usuarios);
  })
  .catch(err => console.error("Error CSV:", err));

// =======================================
// LOGIN MODAL
// =======================================
function abrirLogin() {
  document.getElementById("loginOverlay").style.display = "flex";
}

function cerrarLogin() {
  document.getElementById("loginOverlay").style.display = "none";
}

// =======================================
// LOGIN
// =======================================
function login() {

  if (!csvCargado) {
    alert("Cargando accesos...");
    return;
  }

  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();

  const valido = usuarios.find(
    u => u.user === usuario && u.pass === password
  );

  if (valido) {
    localStorage.setItem("acceso", "true");
    window.location.href = "curso.html"; // ✅ RUTA CORRECTA
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// =======================================
// CERRAR SESIÓN
// =======================================
function cerrarSesion() {
  localStorage.removeItem("acceso");
  window.location.href = "index.html";
}

// =======================================
// CONTROL DE ACCESO
// =======================================
document.addEventListener("DOMContentLoaded", () => {

  const logueado = localStorage.getItem("acceso");

  // Si NO está logueado → solo index
  if (!logueado) {
    if (!location.pathname.endsWith("index.html") && location.pathname !== "/") {
      location.href = "index.html";
    }
  }

  // Si está logueado y entra a index → curso directo
  if (logueado && (location.pathname.endsWith("index.html") || location.pathname === "/")) {
    location.href = "curso.html";
  }

  // Ocultar "Melamina Fácil" cuando está logueado
  if (logueado) {
    const home = document.getElementById("homeLink");
    if (home) home.style.display = "none";
  }
});

// =======================================
// MODAL VIDEOS
// =======================================
function abrirVideo(videoId) {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
  modal.style.display = "flex";
}

function cerrarVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");

  frame.src = "";
  modal.style.display = "none";
}
