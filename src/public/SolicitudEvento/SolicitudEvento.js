console.log("ManejarFormulario.js cargado correctamente.");

// Selección de elementos del formulario
const form = document.getElementById("reportForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const description = document.getElementById("description");

// Función para mostrar mensaje de error
function mostrarError(elemento, mensaje) {
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
form.addEventListener("submit", async function (event) {
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
        mostrarError(description, "Por favor, describe el evento.");
        esValido = false;
    }

    // Enviar si todos los campos son válidos
    if (esValido) {
        // Crear el objeto con los datos del formulario
        const formulario = {
            tipoFormulario: "Solicitud de Evento", // Tipo actual del formulario
            nombre: name.value,
            correo: email.value,
            descripcion: description.value,
        };

        try {
            // Enviar los datos al servidor
            const respuesta = await fetch('/enviarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            if (respuesta.ok) {
                const datos = await respuesta.json();
                alert('Formulario enviado correctamente.');
                console.log('Respuesta del servidor:', datos);
                form.reset();
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
