//CONEXION A LA BASE DE DATOS
const mongoose = require('mongoose'); // Para conectarse a MongoDB

const DB_URI = 'mongodb://localhost:27017/Eventify';

mongoose.connect(DB_URI,{})
    .then(db => console.log('BD EVENTIFY CONECTADA'))
    .catch(err => console.log(err));


//Colección Usuario

//Schema
let usuarioSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    apellido:{type:String, required:true},
    correo:{type:String, required:true, unique:true},
    fechaNacimiento:{type:Date, required:true},
    tipoId:{type:String, required:true},
    numId:{type:Number, required:true, unique:true},
    provincia:{type:String, required:true},
    canton:{type:String, required:true},
    constrasenna:{type:String, required:true}
},{versionKey:false});

//Model
let usuarioModel = new mongoose.model('Usuarios',usuarioSchema);
module.exports = usuarioModel;
