const categorias = {
  consumible: ["empanada", "anticucho", "choripán", "tapadito", "brocheta"],
  bebestible: ["mote con huesillo","piscola","cerveza","terremoto","tropical gin","ramazzotti"],
  articulo: ["viagra","paracetamol","parche león","propóleo","pañuelos desechables","parche curita"]
};

let nombre = "";
let intentos = 0;
let confirmado = false;

const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

const modal = document.getElementById("modal");
const nombreInput = document.getElementById("nombreInput");
const aceptarBtn = document.getElementById("aceptarBtn");

const consumibleDiv = document.getElementById("consumible");
const bebestibleDiv = document.getElementById("bebestible");
const articuloDiv = document.getElementById("articulo");
const saludo = document.getElementById("saludo");

const confirmarBtn = document.getElementById("confirmarBtn");
const reintentarBtn = document.getElementById("reintentarBtn");
const homeBtn = document.getElementById("homeBtn");

function generarConEfecto() {
  let counter = 0;
  const interval = setInterval(() => {
    consumibleDiv.textContent = getRandom(categorias.consumible);
    bebestibleDiv.textContent = getRandom(categorias.bebestible);
    articuloDiv.textContent = getRandom(categorias.articulo);
    counter++;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    consumibleDiv.textContent = getRandom(categorias.consumible);
    bebestibleDiv.textContent = getRandom(categorias.bebestible);
    articuloDiv.textContent = getRandom(categorias.articulo);
  }, 1500);
}

aceptarBtn.onclick = () => {
  if (nombreInput.value.trim() !== "") {
    nombre = nombreInput.value.trim();
    modal.style.display = "none";
    intentos = 1;
    saludo.textContent = `Hola “${nombre}”, ganaste lo siguiente:`;
    generarConEfecto();
  }
};

confirmarBtn.onclick = () => {
  confirmado = true;
  homeBtn.style.display = "inline-block";
  confirmarBtn.style.display = "none";
  reintentarBtn.style.display = "none";
};

reintentarBtn.onclick = () => {
  if (intentos < 2) {
    intentos++;
    generarConEfecto();
  } else {
    reintentarBtn.disabled = true;
    reintentarBtn.textContent = "Sin intentos";
  }
};

homeBtn.onclick = () => {
  nombre = "";
  intentos = 0;
  confirmado = false;
  consumibleDiv.textContent = "Consumible";
  bebestibleDiv.textContent = "Bebestible";
  articuloDiv.textContent = "Artículo";
  saludo.textContent = "Hola “Invitado”, ganaste lo siguiente:";
  modal.style.display = "flex";
  homeBtn.style.display = "none";
  confirmarBtn.style.display = "inline-block";
  reintentarBtn.style.display = "inline-block";
  reintentarBtn.disabled = false;
  reintentarBtn.textContent = "Reintentar";
};
