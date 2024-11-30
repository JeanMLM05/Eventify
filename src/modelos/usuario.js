const mongoose = require('mongoose');

const esquemaUsuario = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  rol: { type: String, default: 'usuario' },
});

module.exports = mongoose.model('Usuario', esquemaUsuario);
