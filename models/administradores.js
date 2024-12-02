const mongoose = require('mongoose');

//Colección Administrador

//Schema
let administradorSchema = new mongoose.Schema({
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
let administradorModel = new mongoose.model('Administradores',administradorSchema);
module.exports = administradorModel;
