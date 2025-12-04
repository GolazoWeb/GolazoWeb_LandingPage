const deportistasData = [
  { nombre: "Juan Pérez", foto: "assets/images/Juan.jpg", validaciones: 120, peso: 75, edad: 24, publicaciones: 12 },
  { nombre: "Mateo Díaz", foto: "assets/images/mateo.webp", validaciones: 98, peso: 68, edad: 22, publicaciones: 8 },
  { nombre: "Mario Silva", foto: "assets/images/mario.avif", validaciones: 87, peso: 80, edad: 26, publicaciones: 10 },
  { nombre: "Luisa Mendoza", foto: "assets/images/luisa.webp", validaciones: 75, peso: 62, edad: 23, publicaciones: 7 },
  { nombre: "Pedro Rojas", foto: "assets/images/pedrito.avif", validaciones: 66, peso: 70, edad: 25, publicaciones: 9 }
];

function renderDeportistas(container) {
  if (!container) return;

  container.innerHTML = "";

  deportistasData.forEach(d => {
    const card = document.createElement("div");
    card.classList.add("deportista-card");

    card.innerHTML = `
      <img src="${d.foto}" alt="${d.nombre}">
      <div class="info">
        <h4>${d.nombre}</h4>
        <div class="stats">
          <span>Peso: ${d.peso} kg</span>
          <span>Edad: ${d.edad} años</span>
          <span>Publicaciones: ${d.publicaciones}</span>
        </div>
        <span class="validation-badge">${d.validaciones} validaciones</span>
        <button class="btn-action">Ver Perfil</button>
      </div>
    `;

    const btnPerfil = card.querySelector(".btn-action");
    btnPerfil.onclick = () => abrirPerfil(d);

    container.appendChild(card);
  });
}

const perfilModal = document.getElementById("perfilModal");
const closePerfilModal = document.getElementById("closePerfilModal");
const cerrarPerfilBtn = document.getElementById("cerrarPerfilBtn");

function abrirPerfil(deportista) {
  document.getElementById("perfilNombre").textContent = deportista.nombre;
  const perfilFoto = document.getElementById("perfilFoto");
  perfilFoto.src = deportista.foto;
  perfilFoto.alt = deportista.nombre;

  document.getElementById("perfilPeso").textContent = deportista.peso;
  document.getElementById("perfilEdad").textContent = deportista.edad;
  document.getElementById("perfilPublicaciones").textContent = deportista.publicaciones;
  document.getElementById("perfilValidaciones").textContent = deportista.validaciones;

  perfilModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  perfilModal.style.display = "none";
  document.body.style.overflow = "auto";
}

closePerfilModal.onclick = cerrarModal;
cerrarPerfilBtn.onclick = cerrarModal;

document.addEventListener("DOMContentLoaded", () => {
  renderDeportistas(document.getElementById("videosDeportistas"));
});
