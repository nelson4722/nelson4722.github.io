let categorias = {};
let nombre = "";
let intentos = 0;
let confirmado = false;

const modal = document.getElementById("modal");
const nombreInput = document.getElementById("nombreInput");
const aceptarBtn = document.getElementById("aceptarBtn");
const saludo = document.getElementById("saludo");
const confirmarBtn = document.getElementById("confirmarBtn");
const reintentarBtn = document.getElementById("reintentarBtn");
const homeBtn = document.getElementById("homeBtn");

// Cards y emojis
const consumibleIcon = document.getElementById("consumibleIcon");
const consumibleNombre = document.getElementById("consumibleNombre");
const bebestibleIcon = document.getElementById("bebestibleIcon");
const bebestibleNombre = document.getElementById("bebestibleNombre");
const articuloIcon = document.getElementById("articuloIcon");
const articuloNombre = document.getElementById("articuloNombre");

const defaultEmoji = {
  consumible: "🍴",
  bebestible: "🥤",
  articulo: "💊"
};

// Obtener elemento aleatorio
const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];

// Generar efecto "ruleta"
function generarConEfecto() {
  const interval = setInterval(actualizarPremios, 100);
  setTimeout(() => {
    clearInterval(interval);
    actualizarPremios();
  }, 1500);
}

// Actualizar premios
function actualizarPremios() {
  const c = getRandom(categorias.consumible);
  const b = getRandom(categorias.bebestible);
  const a = getRandom(categorias.articulo);

  consumibleIcon.innerHTML = c.imagen
    ? `<img src="${c.imagen}" class="emoji-img">`
    : `<span class="emoji">${defaultEmoji.consumible}</span>`;
  consumibleNombre.textContent = c.nombre;

  bebestibleIcon.innerHTML = b.imagen
    ? `<img src="${b.imagen}" class="emoji-img">`
    : `<span class="emoji">${defaultEmoji.bebestible}</span>`;
  bebestibleNombre.textContent = b.nombre;

  articuloIcon.innerHTML = a.imagen
    ? `<img src="${a.imagen}" class="emoji-img">`
    : `<span class="emoji">${defaultEmoji.articulo}</span>`;
  articuloNombre.textContent = a.nombre;
}

// Eventos
aceptarBtn.onclick = () => {
  if (nombreInput.value.trim() !== "") {
    nombre = nombreInput.value.trim();
    modal.style.display = "none";
    intentos = 1;
    saludo.textContent = `Hola "${nombre}", ganaste lo siguiente:`;
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
    reintentarBtn.classList.add("disabled");
  }
};

homeBtn.onclick = () => {
  nombre = "";
  intentos = 0;
  confirmado = false;

  consumibleIcon.innerHTML = `<span class="emoji">${defaultEmoji.consumible}</span>`;
  consumibleNombre.textContent = "Consumible";
  bebestibleIcon.innerHTML = `<span class="emoji">${defaultEmoji.bebestible}</span>`;
  bebestibleNombre.textContent = "Bebestible";
  articuloIcon.innerHTML = `<span class="emoji">${defaultEmoji.articulo}</span>`;
  articuloNombre.textContent = "Artículo";

  saludo.textContent = 'Hola "Invitado", ganaste lo siguiente:';
  modal.style.display = "flex";
  homeBtn.style.display = "none";
  confirmarBtn.style.display = "inline-block";
  reintentarBtn.style.display = "inline-block";
  reintentarBtn.disabled = false;
  reintentarBtn.textContent = "Reintentar";
  reintentarBtn.classList.remove("disabled");
};

// Cargar categorías
fetch('./categorias.json')
  .then(res => res.json())
  .then(data => { categorias = data; })
  .catch(err => console.error("Error al cargar las categorías:", err));
