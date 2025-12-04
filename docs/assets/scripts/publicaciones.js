function renderMisVideos() {
  const container = document.getElementById("misVideos");
  if (!container) return;

  container.innerHTML = "";

  if (misVideosData.length === 0) {
    container.innerHTML = `
      <div class="validation-summary">
        Aún no tienes publicaciones. Sube tu primer video o imagen.
      </div>
    `;
    return;
  }

  misVideosData.forEach((video, index) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");
    videoCard.innerHTML = `
      ${video.type==='video'? `<video src="${video.src}" controls></video>` : `<img src="${video.src}" alt="Imagen">`}
      <div class="video-info">
        <p><strong>Ubicación:</strong> ${video.ubicacion || '<span class="error-msg">Falta ubicación</span>'}</p>
        <p><strong>Fecha:</strong> ${video.fecha || '<span class="error-msg">Falta fecha</span>'}</p>
        <p><strong>Descripción:</strong> ${video.descripcion || '<span class="error-msg">Sin descripción</span>'}</p>
      </div>
      <button class="btn ghost small" onclick="eliminarVideo(${index})">Eliminar</button>
    `;
    container.appendChild(videoCard);
  });
}


let pendingDeleteIndex = null;

function eliminarVideo(index) {
  pendingDeleteIndex = index;
  const deleteModal = document.getElementById("deleteModal");
  deleteModal.style.display = "flex";
}

document.getElementById("deleteConfirmBtn").addEventListener("click", () => {
  if (pendingDeleteIndex !== null) {
    misVideosData.splice(pendingDeleteIndex, 1);
    renderMisVideos();
    pendingDeleteIndex = null;
  }
  document.getElementById("deleteModal").style.display = "none";
});

document.getElementById("deleteCancelBtn").addEventListener("click", () => {
  pendingDeleteIndex = null;
  document.getElementById("deleteModal").style.display = "none";
});

const buscarMiVideo = document.getElementById("buscarMiVideo");
const filtrarFecha = document.getElementById("filtrarFecha");

function renderMisVideos() {
  const container = document.getElementById("misVideos");
  if (!container) return;
  container.innerHTML = "";

  const searchText = buscarMiVideo?.value.trim().toLowerCase() || "";
  const fechaFilter = filtrarFecha?.value || "";

  // Filtrar los videos
  const filteredVideos = misVideosData.filter(video => {
    const matchesTitle = video.ubicacion.toLowerCase().includes(searchText);
    const matchesDate = fechaFilter ? video.fecha === fechaFilter : true;
    return matchesTitle && matchesDate;
  });

  filteredVideos.forEach((video, index) => {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");
    videoCard.innerHTML = `
      ${video.type==='video'? `<video src="${video.src}" controls></video>` : `<img src="${video.src}" alt="Imagen">`}
      <div class="video-info">
        <p><strong>Ubicación:</strong> ${video.ubicacion}</p>
        <p><strong>Fecha:</strong> ${video.fecha}</p>
        <p><strong>Descripción:</strong> ${video.descripcion || 'Sin descripción'}</p>
      </div>
      <button class="btn ghost small" onclick="eliminarVideo(${index})">Eliminar</button>
    `;
    container.appendChild(videoCard);
  });

  // Contador
  const countVideos = document.getElementById("countVideos");
  if(countVideos) countVideos.textContent = filteredVideos.length;

  localStorage.setItem("misVideosData", JSON.stringify(misVideosData));
}

buscarMiVideo?.addEventListener("input", renderMisVideos);
filtrarFecha?.addEventListener("change", renderMisVideos);
