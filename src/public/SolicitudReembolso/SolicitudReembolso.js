console.log("SolicitudReembolso.js cargado correctamente.");

// Selección de elementos del formulario
const formReembolso = document.getElementById("reportForm");
const nameReembolso = document.getElementById("name");
const emailReembolso = document.getElementById("email");
const descriptionReembolso = document.getElementById("description");

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
formReembolso.addEventListener("submit", async function(event) {
    event.preventDefault();
    limpiarErrores(); // Limpiar errores previos
    let esValido = true;

    // Validación del campo Nombre
    if (nameReembolso.value.trim() === "") {
        mostrarError(nameReembolso, "Por favor, ingresa tu nombre completo.");
        esValido = false;
    }

    // Validación del campo Correo Electrónico
    if (!validarCorreo(emailReembolso.value.trim())) {
        mostrarError(emailReembolso, "Por favor, ingresa un correo electrónico válido.");
        esValido = false;
    }

    // Validación del campo Descripción
    if (descriptionReembolso.value.trim() === "") {
        mostrarError(descriptionReembolso, "Por favor, describe el motivo del reembolso.");
        esValido = false;
    }

    // Enviar si todos los campos son válidos
    if (esValido) {
        // Crear el objeto con los datos del formulario
        const formularioReembolso = {
            tipoFormulario: "Solicitud de Reembolso", // Cambiar para identificar este tipo de solicitud
            nombre: nameReembolso.value,
            correo: emailReembolso.value,
            descripcion: descriptionReembolso.value,
        };

        try {
            const respuesta = await fetch('/enviarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formularioReembolso),
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                alert('Formulario enviado correctamente.');
                console.log('Respuesta del servidor:', datos);
                formReembolso.reset();
            } else {
                const error = await respuesta.json();
                alert('Error al enviar el formulario. Intenta nuevamente.');
                console.error('Error del servidor:', error);
            }
        } catch (err) {
            alert('Error al conectar con el servidor.');
            console.error('Error de conexión:', err);
        }
    }
});
