const express = require('express');
const mongoose = require('mongoose');
const app = express();
const nodemailer = require('nodemailer');
const session = require('express-session');
const usuarioModel = require('../models/usuarios.js');
const eventoModel = require('../models/eventos.js');


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

//SESSION
app.use(session({
    secret: 'cadena secreta eventify',
    resave: false,
    saveUninitialized: true
}));


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
app.get('/InformacionEvento/:eventoNombre', async (req, res) => {
    const eventoNombre = req.body.titulo;
    const Evento = require('../models/eventos.js');

    try {
        // Buscar el evento usando el nombre
        const evento = await Evento.findOne({ titulo: eventoNombre });

        // Si no se encuentra el evento, devolver un error 404
        if (!evento) {
            return res.status(404).send("Evento no encontrado");
        }

        // Renderizar la vista con los datos del evento
        res.render('InfoEvento', { evento: evento });
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).send("Error al obtener el evento.");
    }
});

//Perfil del usuario final
app.get('/MiPerfilU',async(req, res) => {
    const usuario = require('../models/usuarios.js');
    try {
        const correo = req.session.correo;

        if (!correo) {
            return res.redirect('/IniciarSesion');
        }

        // Buscar al usuario con el correo guardado en la sesión
        const userBD = await usuario.findOne({ correo: correo });

        if (!userBD) {
            console.log("No se encontró el usuario en la base de datos.");
            return res.redirect('/IniciarSesion');
        }

        // Si el usuario existe, pasar los datos a la vista
        res.render('PerfilUsuario', { usuario:userBD });
        
    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).send("Ocurrió un error al obtener los datos del usuario.");
    }
});


//Perfil del administrador
app.get('/MiPerfilA',async(req, res) => {
    const administrador = require('../models/administradores.js');
    try {
        const correo = req.session.correo;

        if (!correo) {
            return res.redirect('/IniciarSesion');
        }

        // Buscar al usuario con el correo guardado en la sesión
        const userBD = await administrador.findOne({ correo: correo });

        if (!userBD) {
            console.log("No se encontró el administrador en la base de datos.");
            return res.redirect('/IniciarSesion');
        }

        // Si el usuario existe, pasar los datos a la vista
        res.render('PerfilAdmin', { admin:userBD });
        
    } catch (error) {
        console.error("Error al obtener datos del administrador:", error);
        res.status(500).send("Ocurrió un error al obtener los datos del administrador.");
    }
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

//EventosDisponibles
app.get('/EventosDisponibles', async (req, res) => {
    const Evento = require('../models/eventos.js');
    try {
        // Obtener todos los eventos de la base de datos
        const eventos = await Evento.find();

        // Renderizar la vista con los eventos disponibles
        res.render('EventosUI', { eventos: eventos });

    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).send("Error al obtener los eventos.");
    }
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
app.get('/MetodoPago', async (req, res) => {
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
app.get('/AdministrarUsuarios', async (req, res) => {
    try {
        // Obtener usuarios desde la base de datos
        const usuarios = await usuarioModel.find();
        // Renderizar la vista con los datos
        res.render('AdminUser', { usuarios });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).send('Hubo un error al cargar la lista de usuarios.');
    }
});

app.delete('/borrarUsuario/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await usuarioModel.findByIdAndDelete(userId); // Eliminar usuario por ID
        res.status(200).send({ message: 'Usuario borrado correctamente.' });
    } catch (error) {
        console.error('Error al borrar el usuario:', error);
        res.status(500).send({ message: 'Error al borrar el usuario.' });
    }
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
    res.render("ActualizacionEventos")
});




/* BASE DE DATOS */

//LLamar modelos
const usuario = require('../models/usuarios.js');
const administrador = require('../models/administradores.js');
const evento = require('../models/eventos.js');
const compra = require('../models/compras.js');


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
        nombre: "Rayner",
        apellido: "Rodríguez",
        correo: "rayner@gmail.com",
        fechaNacimiento: 2005 - 7 - 20,
        tipoId: "cedula",
        numId: 118870847,
        provincia: "Alajuela",
        canton: "Atenas",
        constrasenna: "Contra4"
    }) 

    const resultado = await admin.save();
}

/*llamar al método --> registrarAdmin();*/


//Iniciar sesión - post
app.post('/iniciarSesion', async(req, res) => {
    try {
        let data = {
            correo: req.body.correo,
            contrasenna: req.body.password
        };

        let userBD = await administrador.findOne({ correo: data.correo });

        if (userBD) {

            /*prueba para ver datos ingresados
            console.log("Datos en la base de datos (Administrador):", userBD); //prueba

            console.log("Correo ingresado:", data.correo);
            console.log("Tipo de correo ingresada:", typeof data.correo);
            console.log("Tipo de correo en la base de datos:", typeof userBD.correo);

            console.log("Contraseña ingresada:", data.contrasenna);
            console.log("Tipo de contraseña ingresada:", typeof data.contrasenna);
            console.log("Tipo de contraseña en la base de datos:", typeof userBD.constrasenna);
            fin prueba1 */

            const inputPassword = data.contrasenna.trim();
            const dbPassword = userBD.constrasenna.trim();

            console.log(`Contraseña ingresada (normalizada): [${inputPassword}]`);
            console.log(`Contraseña en la base de datos (normalizada): [${dbPassword}]`); //prueba

            // Validar contraseña
            if (inputPassword === dbPassword) {
                // Almacenar el correo del usuario en la sesión
                req.session.correo = data.correo;
                console.log("Inicio de sesión exitoso como administrador.");
                return res.redirect('/InicioA');
            } else {
                console.log("Contraseña incorrecta para administrador.");
                return res.redirect('/IniciarSesion');
            }
        }


        userBD = await usuario.findOne({ correo: data.correo });

        if (userBD) {
            /*prueba para ver datos ingresados
            console.log("Datos en la base de datos (Usuario):", userBD);
            console.log("Correo ingresado:", data.correo);
            console.log("Tipo de correo ingresada:", typeof data.correo);
            console.log("Tipo de correo en la base de datos:", typeof userBD.correo);

            console.log("Contraseña ingresada:", data.contrasenna);
            console.log("Tipo de contraseña ingresada:", typeof data.contrasenna);
            console.log("Tipo de contraseña en la base de datos:", typeof userBD.constrasenna);
            fin prueba1*/

            const inputPassword = data.contrasenna.trim();
            const dbPassword = userBD.constrasenna.trim();

            console.log(`Contraseña ingresada (normalizada): [${inputPassword}]`);
            console.log(`Contraseña en la base de datos (normalizada): [${dbPassword}]`); //prueba

            // Validar contraseña
            if (inputPassword === dbPassword) {
                // Almacenar el correo del usuario en la sesión
                req.session.correo = data.correo;
                console.log("Inicio de sesión exitoso como usuario.");
                return res.redirect('/InicioU');
            } else {
                console.log("Contraseña incorrecta para usuario.");
                return res.redirect('/IniciarSesion');
            }
        }

        console.log("Correo no encontrado en administradores ni usuarios.");
        return res.redirect('/IniciarSesion');

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).send("Ocurrió un error al procesar la solicitud.");
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


// Update de datos en PagCompraFinal - post
app.post('/registrarCompra', async (req, res) => {
    try {
        // Crear el objeto de compra
        const nuevaCompra = new compra({
            productos: req.body.productos,
            total: req.body.total,
            telefono: req.body.telefono, // Número de teléfono del comprador
            tarjetaCredito: { // Detalles de la tarjeta de crédito
                nombre: req.body.tarjetaCredito.nombre,
                numero: req.body.tarjetaCredito.numero,
                expiracion: req.body.tarjetaCredito.expiracion,
                cvc: req.body.tarjetaCredito.cvc,
            },
            fecha: new Date(),
        });

        // Guardar la compra en la base de datos
        const resultado = await nuevaCompra.save();
        console.log('Compra registrada correctamente:', resultado);

        // Responder con éxito
        res.status(201).send({
            mensaje: 'Compra registrada con éxito.',
            compra: resultado
        });
    } catch (err) {
        console.error('Error al registrar la compra:', err);

        // Responder con error
        res.status(500).send({
            mensaje: 'Error al registrar la compra.',
            error: err.message
        });
    }
});

//Envío de correos electrónicos
// Configuración del transporte
const transporter = nodemailer.createTransport({
    service: 'gmail', // O el servicio de correo que uses
    auth: {
        user: 'eventifybytd@gmail.com', // Correo de la empresa
        pass: 'ccfpuitqylvtzcke' // Contraseña o contraseña de aplicación
    }
});

// Función para enviar correo
async function enviarCorreo({ asunto, remitente, replyTo, mensaje }) {
    try {
        const info = await transporter.sendMail({
            from: '"Eventify Notificaciones" <eventifybytd@gmail.com>', // Correo de la empresa
            to: 'eventifybytd@gmail.com', // Siempre enviar al correo de la empresa
            subject: asunto, // Asunto
            replyTo: replyTo, // El correo ingresado por el usuario para responder
            html: mensaje, // Mensaje en formato HTML
        });
        console.log('Correo enviado correctamente:', info.messageId);
    } catch (err) {
        console.error('Error al enviar el correo:', err);
    }
}
//ENVIAR CORREO
app.post('/enviarCorreo', async (req, res) => {
    const { tipoFormulario, nombre, correo, descripcion } = req.body;

    try {
        // Construir el mensaje del correo
        const mensajeHTML = `
            <h1>${tipoFormulario}</h1>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Correo:</strong> ${correo}</p>
            <p><strong>Descripción:</strong> ${descripcion}</p>
        `;

        // Enviar el correo
        await enviarCorreo({
            asunto: `${tipoFormulario} - ${nombre}`,
            remitente: 'eventifybytd@gmail.com', // Siempre es el correo de la empresa
            replyTo: correo, // El correo ingresado por el usuario
            mensaje: mensajeHTML,
        });

        res.status(200).send({ mensaje: 'Correo enviado correctamente.' });
    } catch (err) {
        console.error('Error al procesar el formulario:', err);
        res.status(500).send({ mensaje: 'Error al enviar el correo.', error: err.message });
    }
});



//Métodos GET

// Obtener todos los usuarios registrados
app.get('/contarUsuarios', async (req, res) => {
    try {
        const cantidadUsuarios = await usuarioModel.countDocuments(); // Cuenta los documentos en la colección
        res.render('contarUsuarios', { cantidadUsuarios }); // Renderiza la vista con el conteo de usuarios
    } catch (err) {
        console.error("Error al contar usuarios:", err);
        res.status(500).send("Error al contar usuarios.");
    }
});



// Obtener todos los eventos activos
app.get('/obtenerEventosActivos', async (req, res) => {
    try {
        const eventosActivos = await eventoModel.find({ activo: true }); // Asegúrate de que los eventos tengan este campo
        console.log("Eventos activos obtenidos correctamente.");
        res.status(200).json(eventosActivos); // Asegúrate de enviar un array JSON
    } catch (err) {
        console.error("Error al obtener los eventos activos:", err);
        res.status(500).json({
            mensaje: "Error al obtener los eventos activos.",
            error: err.message,
        });
    }
});