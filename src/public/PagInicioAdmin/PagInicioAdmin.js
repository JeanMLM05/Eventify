document.addEventListener('DOMContentLoaded', function () {
    const ventasTotalesElemento = document.getElementById('ventas-totales');
    const eventosActivosElemento = document.getElementById('eventos-activos'); // Selecciona el elemento para eventos activos
    const usuariosRegistradosElemento = document.getElementById('usuarios-registrados');



    // Obtener el total de ventas acumulado desde el localStorage o inicializarlo en 0
    let totalVentas = parseFloat(localStorage.getItem('totalVentas')) || 0;

    // Verificar si hay una nueva venta por procesar
    const nuevaVenta = localStorage.getItem('nuevaVenta') === 'true';

    console.log('Nueva venta:', nuevaVenta); // Depuración

    if (nuevaVenta) {
        // Leer la última compra registrada
        const resumenCompra = JSON.parse(localStorage.getItem('resumenCompra'));

        if (resumenCompra && resumenCompra.total) {
            console.log('Resumen de compra encontrado:', resumenCompra); // Depuración

            // Añadir el total de la última compra al acumulado
            totalVentas += resumenCompra.total;

            // Guardar el nuevo total en el localStorage
            localStorage.setItem('totalVentas', totalVentas);
            console.log('Total ventas actualizado:', totalVentas); // Depuración
        } else {
            console.log('No se encontró un resumen de compra válido.'); // Depuración
        }

        // Desactivar la bandera de nueva venta
        localStorage.setItem('nuevaVenta', 'false');
    }

    // Mostrar el total actualizado en el Dashboard
    ventasTotalesElemento.textContent = `$${totalVentas.toFixed(2)}`;

});