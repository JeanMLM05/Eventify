const express = require('express');

const app = express();

const path = require('path'); //unifica elementos
app.set('views', path.join(__dirname, 'views'));

app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs')

//Archivos estáticos, saber cómo llegar a la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, ()=>{
    console.log("Se conectó al puerto")
}) //puerto, acción

/***********************************************************************************************************/

//RUTAS --> (importante: hacer una para cada página!!)

//Landing Page (cuando no ha iniciado sesión)
app.get('/',(req, res)=>{
    res.render("PagLandingPage.html")
});

//Landing Page Tropical Developers
app.get('/TropicalDevelopers',(req, res)=>{
    res.render("landingpageTD.html")
});

//Página de registro
app.get('/Registro',(req, res)=>{
    res.render("registro.html")
});

//Inicio de sesión
app.get('/IniciarSesion',(req, res)=>{
    res.render("iniciarsesion.html")
});

//Página principal (después de haber iniciado sesión) / página de inicio
app.get('/InicioU',(req, res)=>{
    res.render("PagLandingPageUSuario.html")
});

//Página de información de un evento (detalles del evento)
app.get('/InformacionEvento',(req, res)=>{
    res.render("InfoEvento.html")
});

//Perfil del usuario final
app.get('/MiPerfilU',(req, res)=>{
    res.render("PerfilUsuario.html")
});

//Perfil del administrador
app.get('/MiPerfilA',(req, res)=>{
    res.render("PerfilAdmin.html")
});

//Configuración del perfil del usuario final
app.get('/ConfiguracionDePerfilU',(req, res)=>{
    res.render("ConfigPerfilUsuario.html")
});

//Configuración del perfil del administrador
app.get('/ConfiguracionDePerfilA',(req, res)=>{
    res.render("ConfigPerfilAdmin.html")
});

//Página Nosotros
app.get('/Nosotros',(req, res)=>{
    res.render("Nosotros.html")
});

//Eventos - conciertos
app.get('/EventosConciertos',(req, res)=>{
    res.render("conciertos.html")
});

//Eventos - deportes
app.get('/EventosDeportes',(req, res)=>{
    res.render("deportes.html")
});

//Eventos - gastronomía
app.get('/EventosGastronomia',(req, res)=>{
    res.render("gastronomia.html")
});

//Eventos - exposiciones
app.get('/EventosExposiciones',(req, res)=>{
    res.render("exposiciones.html")
});

//Eventos - fiestas
app.get('/EventosFiestas',(req, res)=>{
    res.render("fiestas.html")
});

//Página de Métodos de pago usuario
app.get('/MetodosDePago',(req, res)=>{
    res.render("MetodoPago.html")
});

//Página Inicio Admin
app.get('/InicioA',(req, res)=>{
    res.render("PagInicioAdmin.html")
});

//Página de administración de eventos
app.get('/AdministrarEventos',(req, res)=>{
    res.render("AdminEventos.html")
});

//Página de administración de usuarios
app.get('/AdministrarUsuarios',(req, res)=>{
    res.render("AdminUsers.html")
});

//Página de editar eventos administrador
app.get('/EditarEvento',(req, res)=>{
    res.render("EditEvent.html")
});

//Página de estadísticas administrador
app.get('/Estadistica',(req, res)=>{
    res.render("Estadistica.html")
});

//Página de crear eventos administrador
app.get('/CrearEvento',(req, res)=>{
    res.render("CreateEvent.html")
});

//Configuración general del sitio web
app.get('/ConfiguracionGeneral',(req, res)=>{
    res.render("ConfiguracionAdmin.html")
});

//Página Mis Eventos
app.get('/MisEventos',(req, res)=>{
    res.render("MisEventos.html")
});

//Página compra final / checkout
app.get('/Checkout',(req, res)=>{
    res.render("PagCompraFinal.html")
});

//FOOTER
//Página términos y condiciones
app.get('/TerminosCondiciones',(req, res)=>{
    res.render("Terminos.html")
});

//Página opciones de soporte
app.get('/Soporte',(req, res)=>{
    res.render("OpcionesSoporteUsuario.html")
});

//Pagina Reportar Problema
app.get('/ReportarProblema',(req, res)=>{
    res.render("OpcSopReportarProblema.html")
});

//Página política de privacidad
app.get('/PoliticaPrivacidad',(req, res)=>{
    res.render("PoliticaPrivacidad.html")
});

//Página contáctanos
app.get('/Contactos',(req, res)=>{
    res.render("Contacto.html")
});

//Pagina de Preguntas Frecuentes
app.get('/PreguntasFrecuentes',(req, res)=>{
    res.render("PreguntasFrecuentes.html")
});

//Pagina de Solicitud de Evento
app.get('/SolicitudEvento',(req, res)=>{
    res.render("SolicitudEvento.html")
});

//Pagina de Solicitud Reembolso
app.get('/SolicitudReembolso',(req, res)=>{
    res.render("SolicitudReembolso.html")
});

//Pagina de Actualizacion de Eventos
app.get('/ActualizacionEventos',(req, res)=>{
    res.render("ActualizacionEventos.html")
});

//BASE DE DATOS



//LLamar modelos
const usuario = require('../models/usuarios.js');
const administrador = require('../models/administradores.js');