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


    // Función para cargar eventos activos
    async function cargarEventosActivos() {
        try {
            const respuesta = await fetch('/obtenerEventosActivos');
            if (respuesta.ok) {
                const eventos = await respuesta.json();
                console.log("Eventos activos recibidos:", eventos); // Depuración
                eventosActivosElemento.textContent = eventos.length > 0 ? eventos.length : "0";
            } else {
                console.error("Error al obtener eventos activos:", await respuesta.text());
                eventosActivosElemento.textContent = "Error";
            }
        } catch (err) {
            console.error("Error al conectar con el servidor para eventos activos:", err);
            eventosActivosElemento.textContent = "Error";
        }
    }


    // Función para cargar usuarios registrados
    async function cargarUsuariosRegistrados() {
        try {
            const respuesta = await fetch('/obtenerUsuarios');
            if (respuesta.ok) {
                const usuarios = await respuesta.json();
                console.log("Usuarios registrados recibidos:", usuarios); // Depuración
                usuariosRegistradosElemento.textContent = usuarios.length > 0 ? usuarios.length : "0";
            } else {
                console.error("Error al obtener usuarios registrados:", await respuesta.text());
                usuariosRegistradosElemento.textContent = "Error";
            }
        } catch (err) {
            console.error("Error al conectar con el servidor para usuarios registrados:", err);
            usuariosRegistradosElemento.textContent = "Error";
        }
    }

    // Llama a las funciones para cargar datos
    cargarEventosActivos();
    cargarUsuariosRegistrados();
});