// Mensaje de consola para confirmar carga del archivo
console.log("configuracion.js cargado correctamente.");

// Seleccionar elementos del formulario
const form = document.querySelector("form");
const siteNameInput = document.getElementById("site-name");
const siteUrlInput = document.getElementById("site-url");
const languageSelect = document.getElementById("language");
const timezoneSelect = document.getElementById("timezone");

// Función para mostrar mensaje de error
function mostrarError(elemento, mensaje) {
    if (elemento.nextElementSibling && elemento.nextElementSibling.classList.contains("error-message")) {
        elemento.nextElementSibling.textContent = mensaje;
    } else {
        const errorMensaje = document.createElement("p");
        errorMensaje.className = "error-message";
        errorMensaje.style.color = "red";
        errorMensaje.style.fontSize = "0.9rem";
        errorMensaje.textContent = mensaje;
        elemento.insertAdjacentElement("afterend", errorMensaje);
    }
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll(".error-message");
    errores.forEach(error => error.remove());
}

// Manejo del envío del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault();
    limpiarErrores();
    let esValido = true;

    // Validación del campo Nombre del Sitio
    if (siteNameInput.value.trim() === "") {
        mostrarError(siteNameInput, "Por favor, ingrese el nombre del sitio web.");
        esValido = false;
    }

    // Validación del campo URL del Sitio
    if (siteUrlInput.value.trim() === "") {
        mostrarError(siteUrlInput, "Por favor, ingrese la URL del sitio web.");
        esValido = false;
    }

    // Enviar si todos los campos son válidos
    if (esValido) {
        alert(`Configuración guardada:\nNombre del Sitio: ${siteNameInput.value}\nURL del Sitio: ${siteUrlInput.value}\nIdioma: ${languageSelect.value}\nZona Horaria: ${timezoneSelect.value}`);
        form.reset();
    }
});
