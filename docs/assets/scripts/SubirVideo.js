let misVideosData = JSON.parse(localStorage.getItem("misVideosData")) || [];

function renderMisVideos() {
  const container = document.getElementById("misVideos");
  if(!container) return;
  container.innerHTML = "";

  misVideosData.forEach((video,index)=>{
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

  localStorage.setItem("misVideosData", JSON.stringify(misVideosData));
  const countVideos = document.getElementById("countVideos");
  if(countVideos) countVideos.textContent = misVideosData.length;
}

function eliminarVideo(index){
  if(confirm("¿Deseas eliminar este video?")){
    misVideosData.splice(index,1);
    renderMisVideos();
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  const uploadForm = document.getElementById("uploadForm");
  const uploadModal = document.getElementById("uploadModal");
  const uploadModalConfirmBtn = document.getElementById("uploadModalConfirmBtn");
  const uploadModalCancelBtn = document.getElementById("uploadModalCancelBtn");

  const summaryUbicacion = document.getElementById("summaryUbicacion");
  const summaryFecha = document.getElementById("summaryFecha");
  const summaryDescripcion = document.getElementById("summaryDescripcion");
  const summaryThumb = document.getElementById("summaryThumb");
  const summaryImage = document.getElementById("summaryImage");
  const uploadSummaryContent = document.getElementById("uploadSummaryContent");

  const errorUbicacion = document.getElementById("errorUbicacion");
  const errorFecha = document.getElementById("errorFecha");
  const errorDescripcion = document.getElementById("errorDescripcion");
  const errorArchivo = document.getElementById("errorArchivo");
  

  let pendingVideo = null;

  uploadForm.addEventListener("submit", e=>{
    e.preventDefault();

    // Reset errores
    errorUbicacion.textContent="";
    errorFecha.textContent="";
    errorDescripcion.textContent="";
    errorArchivo.textContent="";

    const ubicacion = document.getElementById("titulo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const descripcion = document.getElementById("descripcion").value.trim();
    const archivo = document.getElementById("archivo").files[0];

    let hasError=false;
    if(!ubicacion){ errorUbicacion.textContent="La ubicación es obligatoria"; hasError=true; }
    if(!fecha){ errorFecha.textContent="La fecha es obligatoria"; hasError=true; }
    if(!archivo){ errorArchivo.textContent="Debes subir un archivo"; hasError=true; }

    if(hasError) return;

    const tipo = archivo.type.startsWith("video") ? "video" : "image";
    const reader = new FileReader();
    reader.onload = function(e){
      pendingVideo = { ubicacion, fecha, descripcion, src:e.target.result, type:tipo };

      // Mostrar resumen en modal
      summaryUbicacion.textContent=ubicacion;
      summaryFecha.textContent=fecha;
      summaryDescripcion.textContent=descripcion || "Sin descripción";

      if(tipo==="video"){
        summaryThumb.src=e.target.result;
        summaryThumb.style.display="block";
        summaryImage.style.display="none";
      } else {
        summaryImage.src=e.target.result;
        summaryImage.style.display="block";
        summaryThumb.style.display="none";
      }

      uploadSummaryContent.style.display="block";
      uploadModal.style.display="flex";
    }
    reader.readAsDataURL(archivo);
  });

  uploadModalConfirmBtn.addEventListener("click",()=>{
    if(pendingVideo){
      misVideosData.push(pendingVideo);
      renderMisVideos();
      pendingVideo=null;
      uploadForm.reset();
      uploadModal.style.display="none";
      uploadSummaryContent.style.display="none";
    }
  });

  uploadModalCancelBtn.addEventListener("click",()=>{
    pendingVideo=null;
    uploadModal.style.display="none";
    uploadSummaryContent.style.display="none";
  });

  renderMisVideos();
});
