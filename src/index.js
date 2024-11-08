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

/*********************************************************************************/
/*********************************************************************************/
/*********************************************************************************/

//RUTAS --> (importante: hacer una para cada página!!)

//Landing Page
app.get('/',(req, res)=>{
    res.render("PagLandingPage.html")
});

//Página de registro
app.get('/registro',(req, res)=>{
    res.render("registro.html")
});