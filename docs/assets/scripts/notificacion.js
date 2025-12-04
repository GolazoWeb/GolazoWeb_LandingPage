// Seleccionar todos los botones "Marcar"
document.querySelectorAll(".mark-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const li = btn.closest("li");
    if(li) li.remove();
  });
});


// Contadores de perfil
const countVideos = document.getElementById("countVideos");
const countValidaciones = document.getElementById("countValidaciones");

// Traer datos de localStorage o inicializar
let videos = JSON.parse(localStorage.getItem("videos")) || [];
let validaciones = JSON.parse(localStorage.getItem("validaciones")) || [];

// Función para actualizar el perfil
function actualizarPerfil() {
  countVideos.textContent = videos.length;
  countValidaciones.textContent = validaciones.length;
}

// Llamar al cargar
actualizarPerfil();

// Función para agregar video
function agregarVideo(titulo) {
  videos.push({ id: Date.now(), titulo });
  localStorage.setItem("videos", JSON.stringify(videos));
  actualizarPerfil();

  // Crear notificación de video subido
  agregarNotificacion(`Tu video "${titulo}" ha sido subido correctamente.`);
}

// Función para agregar validación
function agregarValidacion(usuario) {
  validaciones.push({ id: Date.now(), usuario });
  localStorage.setItem("validaciones", JSON.stringify(validaciones));
  actualizarPerfil();

  // Crear notificación de validación
  agregarNotificacion(`El usuario ${usuario} ha validado tu video.`);
}
