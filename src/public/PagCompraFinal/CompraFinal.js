document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let isValid = true;

    // Validación de email
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = "Correo electrónico inválido";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    // Validación de número de teléfono
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phonePattern = /^\+?[0-9\s]{8,12}$/;
    if (!phonePattern.test(phone.value.replace(/\s/g, ''))) {
        phoneError.textContent = "Número de teléfono inválido. Debe contener entre 8 y 12 dígitos numéricos.";
        isValid = false;
    } else {
        phoneError.textContent = "";
    }

    // Validación del nombre en la tarjeta
    const cardName = document.getElementById("cardName");
    const cardNameError = document.getElementById("cardName-error");
    if (cardName.value.trim().length < 4) {
        cardNameError.textContent = "El nombre debe tener al menos 4 caracteres.";
        isValid = false;
    } else {
        cardNameError.textContent = "";
    }

    // Validación del número de tarjeta
    const cardNumber = document.getElementById("cardNumber");
    const cardNumberError = document.getElementById("cardNumber-error");
    const cardPattern = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
    if (!cardPattern.test(cardNumber.value)) {
        cardNumberError.textContent = "Número de tarjeta inválido. Formato esperado: 1234 5678 9012 3456";
        isValid = false;
    } else {
        cardNumberError.textContent = "";
    }

    // Validación de CVC
    const cvc = document.getElementById("cvc");
    const cvcError = document.getElementById("cvc-error");
    if (!/^[0-9]{3}$/.test(cvc.value)) {
        cvcError.textContent = "CVC inválido. Debe ser de 3 dígitos.";
        isValid = false;
    } else {
        cvcError.textContent = "";
    }

    // Validación de aceptación de términos y condiciones
    const terms = document.getElementById("terms");
    const termsError = document.getElementById("terms-error");
    if (!terms.checked) {
        termsError.textContent = "Debes aceptar los términos y condiciones para continuar.";
        isValid = false;
    } else {
        termsError.textContent = "";
    }

    // Validación de fecha de vencimiento
    const expiryMonth = document.getElementById("expiry-month").value;
    const expiryYear = document.getElementById("expiry-year").value;
    const expiryDateError = document.getElementById("expiry-error");

    if (expiryMonth && expiryYear) {
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // Los meses son 0-indexados
        const currentYear = today.getFullYear();

        const inputMonth = parseInt(expiryMonth);
        const inputYear = parseInt("20" + expiryYear); // Convertir el año a formato completo (ej., 24 -> 2024)

        if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
            expiryDateError.textContent = "La fecha de vencimiento no puede ser anterior a la fecha actual.";
            isValid = false;
        } else {
            expiryDateError.textContent = "";
        }
    } else {
        expiryDateError.textContent = "Por favor, selecciona el mes y el año de vencimiento.";
        isValid = false;
    }

    


    // Si todas las validaciones son correctas, se procede con la compra
    if (isValid) {
        alert("Compra finalizada con éxito.");
    }
});

// Formato de número de tarjeta y número de teléfono
document.getElementById("cardNumber").addEventListener("input", function(event) {
    const value = event.target.value.replace(/\D/g, '').match(/.{1,4}/g);
    event.target.value = value ? value.join(' ') : '';
});


document.getElementById("phone").addEventListener("input", function(event) {
    const value = event.target.value.replace(/[^\d+]/g, '').slice(0, 12);
    event.target.value = value;
});

// Limitar el campo CVC a solo números y un máximo de 3 caracteres
document.getElementById("cvc").addEventListener("input", function(event) {
    event.target.value = event.target.value.replace(/\D/g, '').slice(0, 3);
});


document.addEventListener('DOMContentLoaded', function () {
    // Selección de contenedores
    const resumenProductos = document.getElementById('productos-lista');
    const resumenTotal = document.getElementById('total-compra');

    // Obtener datos del localStorage
    const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra'));

    if (resumenCompra) {
        // Crear una lista HTML para los productos
        const productosHTML = resumenCompra.productos
            .map(producto => `<li>${producto.cantidad}x ${producto.tipo} ($${producto.precio}/c.u.)</li>`)
            .join('');

        // Actualizar el DOM con la lista y el total
        resumenProductos.innerHTML = `Productos: <ul>${productosHTML}</ul>`;
        resumenTotal.textContent = `Total: $${resumenCompra.total}`;
    } else {
        // Mensajes predeterminados si no hay productos
        resumenProductos.textContent = 'Productos: No hay productos seleccionados.';
        resumenTotal.textContent = 'Total: $0';
    }
});


//VENTAS TOTALES
//VENTAS TOTALES
const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra'));
if (resumenCompra && resumenCompra.total) {
    // Marcar que hay una nueva compra lista para procesar en el Dashboard
    localStorage.setItem('nuevaVenta', 'true');
}
