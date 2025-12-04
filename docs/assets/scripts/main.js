document.addEventListener("DOMContentLoaded", () => {
  // --- Referencias principales ---
  const registroSection = document.getElementById("registro");
  const registerFormStep1 = document.getElementById("register-form");
  const stepRol = document.getElementById("step-rol");

  // --- Funciones globales para mostrar y ocultar formularios ---
  if (registroSection) {
    window.showForm = function (formId) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      registroSection.style.top = headerHeight + "px";
      registroSection.style.height = `calc(100% - ${headerHeight}px)`;
      registroSection.style.display = "flex";

      document.querySelectorAll("#registro .form-box").forEach((box) => box.classList.remove("active"));
      const targetForm = document.getElementById(formId);
      if (targetForm) targetForm.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    window.hideForm = function () {
      registroSection.style.display = "none";
      document.body.style.overflow = "auto";

      if (registerFormStep1) registerFormStep1.classList.add("active");
      if (stepRol) stepRol.classList.remove("active");

      document.querySelectorAll("#registro .form-box").forEach((box) => {
        if (box.id !== "register-form") box.classList.remove("active");
      });
    };
  }

  // --- Validadores comunes ---
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- FORMULARIO DE REGISTRO MULTIPASO ---
  const formRegistro = document.getElementById("formRegistro");
  if (formRegistro) {
    const regNombre = document.getElementById("regNombre");
    const regCorreo = document.getElementById("regCorreo");
    const regPassword = document.getElementById("regPassword");

    const errores = {
      regNombre: document.getElementById("nombreError"),
      regCorreo: document.getElementById("correoError"),
      regPassword: document.getElementById("passwordError"),
    };

    function limpiarErrores() {
      for (const key in errores) {
        if (errores[key]) errores[key].textContent = "";
      }
    }

    // Paso 1: Validación inicial
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();
      limpiarErrores();
      let valido = true;

      if (regNombre.value.trim() === "") {
        errores.regNombre.textContent = "Por favor, ingresa tu nombre.";
        valido = false;
      }
      if (!validateEmail(regCorreo.value.trim())) {
        errores.regCorreo.textContent = "Correo inválido.";
        valido = false;
      }
      if (regPassword.value.trim().length < 6) {
        errores.regPassword.textContent = "La contraseña debe tener mínimo 6 caracteres.";
        valido = false;
      }

      if (valido) {
        registerFormStep1.classList.remove("active");
        stepRol.classList.add("active");
      } else {
        showCustomModal("Por favor, completa correctamente los campos.", "alert");
      }
    });

    // Paso 2: Selección de rol
    document.querySelectorAll(".rol-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedRol = btn.dataset.rol;
        stepRol.classList.remove("active");

        const formDep = document.getElementById("form-deportista");
        const formEnt = document.getElementById("form-entrenador");

        if (selectedRol === "deportista") {
          formDep.classList.add("active");
        } else if (selectedRol === "entrenador") {
          formEnt.classList.add("active");
        }

        // 🔹 Al finalizar cualquiera de los formularios, redirigir al home
        document.querySelectorAll("#form-deportista .btn, #form-entrenador .btn").forEach((finalBtn) => {
          finalBtn.addEventListener("click", () => {
            window.location.href = "home.html";
          });
        });
      });
    });
  }

  

    // --- Lógica del formulario de contacto ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const nombresInput = document.getElementById("nombres");
        const apellidosInput = document.getElementById("apellidos");
        const tipoDocSelect = document.getElementById("tipoDoc");
        const telefonoInput = document.getElementById("telefono");
        const emailInput = document.getElementById("email");
        const mensajeTextarea = document.getElementById("mensaje");
        const rolRadios = document.querySelectorAll('input[name="rol"]');

        // Mapeo de inputs a sus elementos de error para simplificar
        const errorElements = {
            nombres: document.getElementById("nombresError"),
            apellidos: document.getElementById("apellidosError"),
            tipoDoc: document.getElementById("tipoDocError"),
            telefono: document.getElementById("telefonoError"),
            email: document.getElementById("emailError"),
            mensaje: document.getElementById("mensajeError"),
            rol: document.getElementById("rolError")
        };

        function displayError(field, message) {
            if (errorElements[field]) {
                errorElements[field].textContent = message;
            }
        }

        function clearContactFormErrors() {
            for (const key in errorElements) {
                if (errorElements[key]) {
                    errorElements[key].textContent = "";
                }
            }
        }

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            clearContactFormErrors();
            let isValid = true;

            if (nombresInput && nombresInput.value.trim() === "") {
                displayError("nombres", "Por favor, ingrese su nombre.");
                isValid = false;
            }
            if (apellidosInput && apellidosInput.value.trim() === "") {
                displayError("apellidos", "Por favor, ingrese su apellido.");
                isValid = false;
            }
            if (tipoDocSelect && tipoDocSelect.value === "") {
                displayError("tipoDoc", "Por favor, seleccione un tipo de documento.");
                isValid = false;
            }
            if (telefonoInput) {
                if (telefonoInput.value.trim() === "") {
                    displayError("telefono", "Por favor, ingrese su teléfono.");
                    isValid = false;
                } else if (!validatePhoneNumber(telefonoInput.value.trim())) {
                    displayError("telefono", "Por favor, ingrese un teléfono válido de 9 dígitos (solo números).");
                    isValid = false;
                }
            }
            if (emailInput) {
                if (emailInput.value.trim() === "") {
                    displayError("email", "Por favor, ingrese su correo.");
                    isValid = false;
                } else if (!validateEmail(emailInput.value.trim())) {
                    displayError("email", "Por favor, ingrese un correo válido.");
                    isValid = false;
                }
            }
            if (mensajeTextarea && mensajeTextarea.value.trim() === "") {
                displayError("mensaje", "Completa este campo.");
                isValid = false;
            }
            if (rolRadios.length > 0 && !Array.from(rolRadios).some((radio) => radio.checked)) {
                displayError("rol", "Por favor, seleccione si es estudiante o conductor.");
                isValid = false;
            }

            if (!isValid) {
                showCustomModal("Por favor, complete todos los campos requeridos correctamente.", "alert");
                return;
            }

            showCustomModal(
                "Está a punto de enviar el formulario, ¿Desea continuar?",
                "confirm",
                (confirmed) => {
                    if (confirmed) {
                        showCustomModal("¡Mensaje enviado correctamente!", "alert", () => {
                            contactForm.reset();
                            clearContactFormErrors();
                        });
                    } else {
                        showCustomModal("Envío de mensaje cancelado.", "alert");
                    }
                }
            );
        });
    }


  // --- FORMULARIO DE LOGIN ---
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const loginCorreo = document.getElementById("loginCorreo");
    const loginPassword = document.getElementById("loginPassword");
    const loginCorreoError = document.getElementById("loginCorreoError");
    const loginPasswordError = document.getElementById("loginPasswordError");

    function limpiarLoginErrores() {
      loginCorreoError.textContent = "";
      loginPasswordError.textContent = "";
    }

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      limpiarLoginErrores();

      let valido = true;

      if (!validateEmail(loginCorreo.value.trim())) {
        loginCorreoError.textContent = "Correo inválido.";
        valido = false;
      }
      if (loginPassword.value.trim() === "") {
        loginPasswordError.textContent = "Ingrese su contraseña.";
        valido = false;
      }

      if (!valido) {
        showCustomModal("Por favor, completa correctamente tus credenciales.", "alert");
        return;
      }

      showCustomModal("¡Inicio de sesión exitoso!", "alert", () => {
        loginForm.reset();
        limpiarLoginErrores();
        window.hideForm();
        window.location.href = "home.html";
      });
    });
  }
});
