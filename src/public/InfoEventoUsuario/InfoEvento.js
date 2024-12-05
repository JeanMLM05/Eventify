document.getElementById('formulario-evento').addEventListener('submit', function (e) {
    e.preventDefault(); // Previene el envío del formulario hasta validar

    // Obtener los selects de las entradas
    const entradasGeneral = parseInt(document.getElementById('cantEntradas1').value) || 0;
    const entradasVIP = parseInt(document.getElementById('cantEntradas2').value) || 0;
    const precioGeneral = 20;
    const precioVIP = 35;

    // Calcular el total
    const total = (entradasGeneral * precioGeneral) + (entradasVIP * precioVIP);

    // Verificar que se haya seleccionado al menos una entrada
    if (total === 0) {
        alert('Debe seleccionar al menos una entrada para continuar.');
        return;
    }

    // Verificar que se acepten los términos
    const terminos = document.getElementById('terminos');
    if (!terminos.checked) {
        alert('Debe aceptar los términos y condiciones para continuar.');
        return;
    }

    // Guardar datos en localStorage
    const resumenCompra = {
        productos: [],
        total: total
    };

    if (entradasGeneral > 0) {
        resumenCompra.productos.push({ tipo: 'General', cantidad: entradasGeneral, precio: precioGeneral });
    }
    if (entradasVIP > 0) {
        resumenCompra.productos.push({ tipo: 'VIP', cantidad: entradasVIP, precio: precioVIP });
    }

    localStorage.setItem('resumenCompra', JSON.stringify(resumenCompra));

    // Redirigir a la página de checkout
    alert('Redirigiendo a checkout...');
    setTimeout(() => {
        window.location.href = "../PagCompraFinal/PagCompraFinal.html";
    }, 1000);
});



/*
const $formulario = document.getElementById('formulario') // contiene todos los elementos dentro del form, con id="formulario"
const $entradas = document.querySelectorAll('#cantEntradas');
const $btnFinalizarCompra = document.querySelector("btn-FinalizarCompra");
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
$formulario.addEventListener("submitForm", (e) => {
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
*/