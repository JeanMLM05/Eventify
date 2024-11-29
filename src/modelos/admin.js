const mongoose = require('mongoose');

const esquemaAdmin = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  privilegios: { type: String, default: 'todos' },
});

module.exports = mongoose.model('Admin', esquemaAdmin);
