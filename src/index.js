const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');

const path = require('path'); //unifica elementos
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

//Archivos estáticos, saber cómo llegar a la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("Se conectó al puerto")
}) //puerto, acción

/***********************************************************************************************************/

//RUTAS --> (importante: hacer una para cada página!!)

//Landing Page (cuando no ha iniciado sesión)
app.get('/', (req, res) => {
    res.render("PagLandingPage.html")
});

//Landing Page Tropical Developers
app.get('/TropicalDevelopers', (req, res) => {
    res.render("landingpageTD.html")
});

//Página de registro
app.get('/Registro', (req, res) => {
    res.render("registro.html")
});

//Inicio de sesión
app.get('/IniciarSesion', (req, res) => {
    res.render("iniciarsesion.html")
});

//Página principal (después de haber iniciado sesión) / página de inicio
app.get('/InicioU', (req, res) => {
    res.render("PagLandingPageUSuario.html")
});

//Página de información de un evento (detalles del evento)
app.get('/InformacionEvento', (req, res) => {
    res.render("InfoEvento.html")
});

//Perfil del usuario final
app.get('/MiPerfilU', (req, res) => {
    res.render("PerfilUsuario.html")
});

//Perfil del administrador
app.get('/MiPerfilA', (req, res) => {
    res.render("PerfilAdmin.html")
});

//Configuración del perfil del usuario final
app.get('/ConfiguracionDePerfilU', (req, res) => {
    res.render("ConfigPerfilUsuario.html")
});

//Configuración del perfil del administrador
app.get('/ConfiguracionDePerfilA', (req, res) => {
    res.render("ConfigPerfilAdmin.html")
});

//Página Nosotros
app.get('/Nosotros', (req, res) => {
    res.render("Nosotros.html")
});

//Eventos - conciertos
app.get('/EventosConciertos', (req, res) => {
    res.render("conciertos.html")
});

//Eventos - deportes
app.get('/EventosDeportes', (req, res) => {
    res.render("deportes.html")
});

//Eventos - gastronomía
app.get('/EventosGastronomia', (req, res) => {
    res.render("gastronomia.html")
});

//Eventos - exposiciones
app.get('/EventosExposiciones', (req, res) => {
    res.render("exposiciones.html")
});

//Eventos - fiestas
app.get('/EventosFiestas', (req, res) => {
    res.render("fiestas.html")
});

//Página de Métodos de pago usuario
app.get('/MetodosDePago', (req, res) => {
    res.render("MetodoPago.html")
});

//Página Inicio Admin
app.get('/InicioA', (req, res) => {
    res.render("PagInicioAdmin.html")
});

//Página de administración de eventos
app.get('/AdministrarEventos', (req, res) => {
    res.render("AdminEventos.html")
});

//Página de administración de usuarios
app.get('/AdministrarUsuarios', (req, res) => {
    res.render("AdminUsers.html")
});

//Página de editar eventos administrador
app.get('/EditarEvento', (req, res) => {
    res.render("EditEvent.html")
});

//Página de estadísticas administrador
app.get('/Estadistica', (req, res) => {
    res.render("Estadistica.html")
});

//Página de crear eventos administrador
app.get('/CrearEvento', (req, res) => {
    res.render("CreateEvent.html")
});

//Configuración general del sitio web
app.get('/ConfiguracionGeneral', (req, res) => {
    res.render("ConfiguracionAdmin.html")
});

//Página Mis Eventos
app.get('/MisEventos', (req, res) => {
    res.render("MisEventos.html")
});

//Página compra final / checkout
app.get('/Checkout', (req, res) => {
    res.render("PagCompraFinal.html")
});

//FOOTER
//Página términos y condiciones
app.get('/TerminosCondiciones', (req, res) => {
    res.render("Terminos.html")
});

//Página opciones de soporte
app.get('/Soporte', (req, res) => {
    res.render("OpcionesSoporteUsuario.html")
});

//Pagina Reportar Problema
app.get('/ReportarProblema', (req, res) => {
    res.render("OpcSopReportarProblema.html")
});

//Página política de privacidad
app.get('/PoliticaPrivacidad', (req, res) => {
    res.render("PoliticaPrivacidad.html")
});

//Página contáctanos
app.get('/Contactos', (req, res) => {
    res.render("Contacto.html")
});

//Pagina de Preguntas Frecuentes
app.get('/PreguntasFrecuentes', (req, res) => {
    res.render("PreguntasFrecuentes.html")
});

//Pagina de Solicitud de Evento
app.get('/SolicitudEvento', (req, res) => {
    res.render("SolicitudEvento.html")
});

//Pagina de Solicitud Reembolso
app.get('/SolicitudReembolso', (req, res) => {
    res.render("SolicitudReembolso.html")
});

//Pagina de Actualizacion de Eventos
app.get('/ActualizacionEventos', (req, res) => {
    res.render("ActualizacionEventos.html")
});

/* BASE DE DATOS */

//LLamar modelos
const usuario = require('../models/usuarios.js');
const administrador = require('../models/administradores.js');

//Métodos POST

//Registro de usuarios - post
app.post('/registrarUsuario', (req, res) => {
    let data = new usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellidos,
        correo: req.body.correo,
        fechaNacimiento: req.body.nacimiento,
        tipoId: req.body.tipoid,
        numId: req.body.idd,
        provincia: req.body.provincia,
        canton: req.body.canton,
        constrasenna: req.body.password
    })

    data.save()
        .then(() => {
            console.log("El usuario se ha registrado correctamente")
        })
        .catch((err) => {
            console.log(err)
        })

    res.redirect('/IniciarSesion')
});

//Registro de administradores (manual)
const registrarAdmin = async () => {
    const admin = new administrador({
        nombre: "Sidney",
        apellido: "Rodríguez",
        correo: "sidney@gmail.com",
        fechaNacimiento: 2005 - 5 - 27,
        tipoId: "cedula",
        numId: 119360592,
        provincia: "Alajuela",
        canton: "Central",
        constrasenna: "Pepsi"
    })

    const resultado = await admin.save();
}

/*llamar al método --> registrarAdmin();*/


//Iniciar sesión - post
const {validarInicioSesion} = require('../servicios/serviciosUsuarios.js');

app.post('/iniciarSesion', async (req, res) => {
    const { correo, password } = req.body;

    try {
        const resultado = await validarInicioSesion(correo, password);

        if (resultado.tipo === "administrador") {
            res.redirect('/InicioA');
        } else if (resultado.tipo === "usuario") {
            res.redirect('/InicioU');
        }
    } catch (error) {
        console.error(error.message);
        res.redirect('/IniciarSesion');
    }
});


//Update de datos en configPerfilAdmin - post
app.post('/actualizarPerfilAdmin', async (req, res) => {
    try {
        const idd = Number(req.body.idd);

        const administradorExistente = await administrador.findOne({ numId: idd });

        if (!administradorExistente) {
            console.log("No se encontró un administrador con la cédula proporcionada:", idd);
        }

        const camposActualizados = {};
        if (req.body.nombre) camposActualizados.nombre = req.body.nombre;
        if (req.body.apellido) camposActualizados.apellido = req.body.apellido;
        if (req.body.correo) camposActualizados.correo = req.body.correo;
        if (req.body.fechanacimiento) camposActualizados.fechaNacimiento = req.body.fechanacimiento;
        if (req.body.tipoid) camposActualizados.tipoId = req.body.tipoid;
        if (req.body.provincia) camposActualizados.provincia = req.body.provincia;
        if (req.body.canton) camposActualizados.canton = req.body.canton;
        if (req.body.password) camposActualizados.constrasenna = req.body.password;


        const resultado = await administrador.updateOne({ numId: idd }, { $set: camposActualizados });

        if (resultado.modifiedCount > 0) {
            console.log("Administrador actualizado correctamente:", idd);
            res.redirect('/MiPerfilA'); 
        } else {
            console.log("No se realizaron cambios en el administrador:", idd);
        }
    } catch (err) {
        console.error("Error al actualizar el administrador:", err);
    }
});



//Update de datos en configPerfilAdmin - post
app.post('/actualizarPerfilUser', async (req, res) => {
    try {
        const idd = Number(req.body.idd);

        const usuarioExistente = await usuario.findOne({ numId: idd });

        if (!usuarioExistente) {
            console.log("No se encontró un usuario con la cédula proporcionada:", idd);
        }

        const camposActualizados = {};
        if (req.body.nombre) camposActualizados.nombre = req.body.nombre;
        if (req.body.apellido) camposActualizados.apellido = req.body.apellido;
        if (req.body.correo) camposActualizados.correo = req.body.correo;
        if (req.body.fechanacimiento) camposActualizados.fechaNacimiento = req.body.fechanacimiento;
        if (req.body.tipoid) camposActualizados.tipoId = req.body.tipoid;
        if (req.body.provincia) camposActualizados.provincia = req.body.provincia;
        if (req.body.canton) camposActualizados.canton = req.body.canton;
        if (req.body.password) camposActualizados.constrasenna = req.body.password;

        const resultado = await usuario.updateOne({ numId: idd }, { $set: camposActualizados });

        if (resultado.modifiedCount > 0) {
            console.log("Usuario actualizado correctamente:", idd);
            res.redirect('/MiPerfilU');
        } else {
            console.log("No se realizaron cambios en el usuario:", idd);
        }
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
    }
});


//Métodos GET




//MetodoPago Rutas 

// Importar el modelo de tarjeta
const Tarjeta = require('./models/Tarjeta');
// Middleware
app.use(express.json()); // Para analizar cuerpos JSON
app.use(cors()); // Para habilitar CORS

// Rutas

// Ruta para agregar una tarjeta (POST)
app.post('/api/tarjetas', async (req, res) => {
    const { nombreCompleto, numeroTarjeta, tipoTarjeta, mesExpiracion, anioExpiracion } = req.body;

    try {
        // Crear una nueva tarjeta
        const tarjeta = new Tarjeta({
            nombreCompleto,
            numeroTarjeta,
            tipoTarjeta,
            mesExpiracion,
            anioExpiracion
        });

        // Guardar la tarjeta en la base de datos
        await tarjeta.save();
        res.status(201).json(tarjeta); // Enviar la tarjeta recién creada como respuesta
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la tarjeta' });
    }
});

// Ruta para obtener todas las tarjetas (GET)
app.get('/api/tarjetas', async (req, res) => {
    try {
        const tarjetas = await Tarjeta.find(); // Obtener todas las tarjetas
        res.status(200).json(tarjetas); // Devolver las tarjetas
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tarjetas' });
    }
});

// Ruta para eliminar una tarjeta (DELETE)
app.delete('/api/tarjetas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const tarjeta = await Tarjeta.findByIdAndDelete(id); // Eliminar tarjeta por ID

        if (!tarjeta) {
            return res.status(404).json({ error: 'Tarjeta no encontrada' });
        }

        res.status(200).json({ message: 'Tarjeta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarjeta' });
    }
});