document.querySelectorAll(".mark-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const li = btn.closest("li");
    if(li) li.remove();
  });
});

const countVideos = document.getElementById("countVideos");
const countValidaciones = document.getElementById("countValidaciones");

let videos = JSON.parse(localStorage.getItem("videos")) || [];
let validaciones = JSON.parse(localStorage.getItem("validaciones")) || [];


function actualizarPerfil() {
  countVideos.textContent = videos.length;
  countValidaciones.textContent = validaciones.length;
}

actualizarPerfil();

function agregarVideo(titulo) {
  videos.push({ id: Date.now(), titulo });
  localStorage.setItem("videos", JSON.stringify(videos));
  actualizarPerfil();

  agregarNotificacion(`Tu video "${titulo}" ha sido subido correctamente.`);
}

function agregarValidacion(usuario) {
  validaciones.push({ id: Date.now(), usuario });
  localStorage.setItem("validaciones", JSON.stringify(validaciones));
  actualizarPerfil();

  agregarNotificacion(`El usuario ${usuario} ha validado tu video.`);
}
