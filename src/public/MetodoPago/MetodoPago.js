// Función para validar el número de tarjeta (solo números y 16 dígitos)
function validarNumeroTarjeta(numero) {
    const regex = /^\d{16}$/; // Expresión regular para validar 16 dígitos
    return regex.test(numero);
}

// Función para agregar una tarjeta a la lista de tarjetas registradas
async function agregarTarjeta(event) {
    event.preventDefault(); // Prevenir el envío del formulario para no recargar la página

    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    const tipoTarjeta = document.getElementById('tipoTarjeta').value;
    const mesExpiracion = document.getElementById('mesExpiracion').value;
    const anioExpiracion = document.getElementById('anioExpiracion').value;

    // Validación del número de tarjeta
    if (!validarNumeroTarjeta(numeroTarjeta)) {
        alert('El número de tarjeta debe tener 16 dígitos.');
        return;
    }

    // Enviar datos al backend para guardarlos en la base de datos
    const response = await fetch('/api/tarjetas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombreCompleto,
            numeroTarjeta,
            tipoTarjeta,
            mesExpiracion,
            anioExpiracion
        }),
    });

    const data = await response.json();
    if (response.ok) {
        // Crear un nuevo elemento de tarjeta en la lista
        const listaTarjetas = document.querySelector('.lista-tarjetas');
        const tarjetaDiv = document.createElement('div');
        tarjetaDiv.classList.add('tarjeta');
        tarjetaDiv.id = data._id; // Usar el ID que devuelve el backend

        tarjetaDiv.innerHTML = `
            <div class="tarjeta-info">
                <p class="numero-tarjeta">${numeroTarjeta.replace(/.(?=.{4})/g, '*')}</p>
                <p class="vencimiento">Vencimiento: ${mesExpiracion}/${anioExpiracion}</p>
                <p class="titular">${nombreCompleto}</p>
                <span class="tipo-tarjeta">${tipoTarjeta}</span>
            </div>
            <button class="eliminar-tarjeta">×</button>
        `;

        // Agregar la tarjeta a la lista
        listaTarjetas.appendChild(tarjetaDiv);

        // Limpiar el formulario
        document.querySelector('.form-tarjeta').reset();

        // Añadir el evento de eliminar a la tarjeta recién añadida
        tarjetaDiv.querySelector('.eliminar-tarjeta').addEventListener('click', eliminarTarjeta);
    } else {
        alert('Error al agregar la tarjeta');
        console.log(data.error);
    }
}

// Función para eliminar una tarjeta
async function eliminarTarjeta(event) {
    const tarjeta = event.target.closest('.tarjeta');
    const tarjetaId = tarjeta.id; // Obtener el ID de la tarjeta (que se pasó en el DOM)

    const response = await fetch(`/api/tarjetas/${tarjetaId}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
        alert('Tarjeta eliminada correctamente');
        tarjeta.remove(); // Eliminar la tarjeta del DOM si la eliminación fue exitosa
    } else {
        alert('Error al eliminar la tarjeta');
        console.log(data.error);
    }
}

// Agregar el evento de agregar tarjeta al formulario
document.querySelector('.form-tarjeta').addEventListener('submit', agregarTarjeta);
