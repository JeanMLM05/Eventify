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
/***********************************************************************************************************/
/***********************************************************************************************************/


//RUTAS --> (importante: hacer una para cada página!!)


/*

IMPORTANTE --> LOS NOMBRES DE LAS RUTAS VAN CON MAYÚSCULA.  ej: /MiPerfil  


                Por favor fíjense que no haya dos direcciones con el mismo nombre :)

*/



//Landing Page
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
    res.render("ConfigPerfilAdmin .html")
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

//Página Inicio Admin
app.get('/Inicio',(req, res)=>{
    res.render("PagInicioAdmin.html")
});

//Página de administración de eventos
app.get('/AdministrarEventos',(req, res)=>{
    res.render("AdmminEventos.html")
});

//Página de administración de usuarios
app.get('/AdministrarUsuarios',(req, res)=>{
    res.render("AdminUsers.html")
});

//Configuración general del sitio web
app.get('/ConfiguracionGeneral',(req, res)=>{
    res.render("ConfiguracionAdmin.html")
});


//FOOTER
//Página términos y condiciones
app.get('/TerminosCondiciones',(req, res)=>{
    res.render("Terminos.html")                         /* REVISAR QUE LOS HTML TENGAN EL MISMO NOMBRE AL CREAR LAS PÁGINAS */
});

//Página opciones de soporte
app.get('/Soporte',(req, res)=>{
    res.render("OpcionesSoporteUsuario.html")
});

//Página política de privacidad
app.get('/PoliticaPrivacidad',(req, res)=>{
    res.render("PoliticaPriv.html")
});

//Página contáctanos
app.get('/Contactos',(req, res)=>{
    res.render("Contacto.html")
});

