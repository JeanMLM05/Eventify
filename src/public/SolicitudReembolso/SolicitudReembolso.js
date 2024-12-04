console.log("ManejarFormulario.js cargado correctamente.");


// Selección de elementos del formulario
const form = document.getElementById("reportForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const description = document.getElementById("description");

// Función para mostrar mensaje de error
function mostrarError(elemento, mensaje) {
    // Verificar si ya existe un mensaje de error
    if (elemento.nextElementSibling && elemento.nextElementSibling.classList.contains("error-message")) {
        elemento.nextElementSibling.textContent = mensaje; // Actualizar mensaje si ya existe
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

// Validación de correo electrónico
function validarCorreo(correo) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(correo);
}

// Manejo del envío del formulario
form.addEventListener("submit", function(event) {
    event.preventDefault();
    limpiarErrores(); // Limpiar errores previos
    let esValido = true;

    // Validación del campo Nombre
    if (name.value.trim() === "") {
        mostrarError(name, "Por favor, ingresa tu nombre completo.");
        esValido = false;
    }

    // Validación del campo Correo Electrónico
    if (!validarCorreo(email.value.trim())) {
        mostrarError(email, "Por favor, ingresa un correo electrónico válido.");
        esValido = false;
    }

    // Validación del campo Descripción
    if (description.value.trim() === "") {
        mostrarError(description, "Por favor llenar este espacio con lo solicitado");
        esValido = false;
    }

    // Enviar si todos los campos son válidos
    if (esValido) {
        alert(`Solicitud enviada:\nNombre: ${name.value}\nCorreo: ${email.value}\nDescripción: ${description.value}`);
        form.reset();
    }
});