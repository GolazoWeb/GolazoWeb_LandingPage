// ----- Navegación (sidebar) -----
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".app-section");
const notiBadge = document.getElementById("notiBadge");

// mobile menu toggle (simple)
const mobileToggle = document.getElementById("mobileMenuToggle");
if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    const sb = document.querySelector(".sidebar");
    sb.style.display = sb.style.display === "flex" ? "none" : "flex";
  });
}

function showSection(id) {
  sections.forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");

  navButtons.forEach(b => b.classList.toggle("active", b.dataset.section === id));
}

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.section);
    // hide sidebar on mobile after click
    if (window.innerWidth <= 700) {
      document.querySelector(".sidebar").style.display = "none";
    }
  });
});

// ----- Datos iniciales -----
let videos = JSON.parse(localStorage.getItem("videos")) || [];
let notificaciones = JSON.parse(localStorage.getItem("notificaciones")) || [];


const btnLikes = document.querySelectorAll(".btn-like");

btnLikes.forEach(btn => {
  btn.addEventListener("click", () => {
    // Animación “pop”
    btn.classList.add("pop");
    setTimeout(() => btn.classList.remove("pop"), 400);

    // Cambiar color al presionar
    btn.classList.toggle("liked");

    // Actualizar contador si tienes
    const countEl = btn.querySelector(".like-count");
    if(countEl){
      let current = parseInt(countEl.textContent || "0");
      if(btn.classList.contains("liked")){
        countEl.textContent = current + 1;
      } else {
        countEl.textContent = current - 1;
      }
    }

    // Guardar estado en localStorage si quieres persistencia
  });
});

