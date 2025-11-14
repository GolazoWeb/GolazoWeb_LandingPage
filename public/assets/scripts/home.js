document.addEventListener("DOMContentLoaded", () => {
  const videos = [
    { titulo: "Gol Olímpico", autor: "Juan Pérez", img: "assets/images/video1.jpg" },
    { titulo: "Atajada Épica", autor: "Carlos Gómez", img: "assets/images/video2.jpg" },
    { titulo: "Regate Imparable", autor: "Luis Torres", img: "assets/images/video3.jpg" }
  ];

  const entrenamientos = [
    { nombre: "Control del balón", nivel: "Intermedio", img: "assets/images/train1.avif" },
    { nombre: "Resistencia física", nivel: "Avanzado", img: "assets/images/train2.webp" },
    { nombre: "Tiro al arco", nivel: "Básico", img: "assets/images/train3.webp" }
  ];

  const videosContainer = document.getElementById("videosContainer");
  const trainContainer = document.getElementById("trainContainer");

  videos.forEach(v => {
    const card = document.createElement("div");
    card.classList.add("video-card");
    card.innerHTML = `
      <img src="${v.img}" alt="${v.titulo}">
      <h3>${v.titulo}</h3>
      <p>${v.autor}</p>
    `;
    videosContainer.appendChild(card);
  });

  entrenamientos.forEach(t => {
    const card = document.createElement("div");
    card.classList.add("train-card");
    card.innerHTML = `
      <img src="${t.img}" alt="${t.nombre}">
      <h3>${t.nombre}</h3>
      <p>Nivel: ${t.nivel}</p>
    `;
    trainContainer.appendChild(card);
  });

  const supportForm = document.getElementById("supportForm");
  supportForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Tu mensaje ha sido enviado. ¡Gracias por contactarnos!");
    supportForm.reset();
  });

  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    alert("Sesión cerrada correctamente.");
    window.location.href = "index.html";
  });

  document.getElementById("btnExplorar").addEventListener("click", () => {
    document.getElementById("videos").scrollIntoView({ behavior: "smooth" });
  });

  const btnUpload = document.getElementById("btnUpload");
  const fileInput = document.getElementById("videoUpload");
  const previewContainer = document.getElementById("previewContainer");

  btnUpload.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-img">`;
      };
      reader.readAsDataURL(file);
    }
  });
});
