const mongoose = require('mongoose');

//Colección Evento

//Schema
let eventoSchema = new mongoose.Schema({
    titulo:{type:String, required:true, unique:true},
    fecha:{type:Date, required:true},
    lugar:{type:String, required:true},
    hora:{type:String, required:true},
    descripcion:{type:String, required:true},
    precioGeneral:{type:Number, required:true},
    precioVip:{type:Number, required:true},
},{versionKey:false});

//Model
let eventoModel = new mongoose.model('Eventos',eventoSchema);
module.exports = eventoModel;