const $formulario = document.getElementById('#formulario') // contiene todos los elementos dentro del form, con id="formulario"
const $entradas = document.querySelectorAll('.cantEntradas');
const $btnFinalizarCompra = document.querySelector("#btn-FinalizarCompra");
const $checkboxTerminos = document.getElementById('#terminos');

// Crear campos de validación
const campos = {
    terminos: false, // Validar si el checkbox está marcado
    entradas: false  // Validar si al menos una de las dos entradas es mayor a cero
};

// Validar entradas
const validarEntradas = () => {
    const cant1 = parseInt(document.getElementById('cantEntradas1').value) || 0;
    const cant2 = parseInt(document.getElementById('cantEntradas2').value) || 0;

    if (cant1 > 0 || cant2 > 0) {
        campos.entradas = true;
        document.getElementById("formulario-input-error").classList.remove("formulario-input-error-activo");
    } else {
        campos.entradas = false;
        document.getElementById("formulario-input-error").classList.add("formulario-input-error-activo");
    }
};

// Validar checkbox de términos
const validarTerminos = () => {
    campos.terminos = $checkboxTerminos.checked;
};

// Agregar eventos para validar entradas
$entradas.forEach((entrada) => {
    entrada.addEventListener("change", validarEntradas);
});

// Agregar evento para validar términos
$checkboxTerminos.addEventListener("change", validarTerminos);

// Validar el envío de los datos
$formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    validarEntradas(); // Validar entradas antes de enviar
    validarTerminos(); // Validar términos antes de enviar

    if (campos.entradas && campos.terminos) {
        document.getElementById("formulario-mensaje-exito").classList.add("formulario-mensaje-exito-activo");
        setTimeout(() => {
            window.location.href = "/Checkout"; // Redirigir si todo es válido
        }, 3000);
    } else {
        alert("Debes seleccionar al menos una entrada y aceptar los términos y condiciones para continuar.");
    }
});