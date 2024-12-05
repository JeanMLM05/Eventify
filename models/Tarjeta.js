const mongoose = require('mongoose');

const tarjetaSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
    minlength: 3
  },
  numeroTarjeta: {
    type: String,
    required: true,
    maxlength: 16,
    minlength: 16
  },
  tipoTarjeta: {
    type: String,
    required: true,
    enum: ['Visa', 'MasterCard', 'AmericanExpress']
  },
  fechaExpiracion: {
    mes: {
      type: String,
      required: true
    },
    anio: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true // Agrega las fechas de creación y actualización
});

const Tarjeta = mongoose.model('Tarjeta', tarjetaSchema);

module.exports = Tarjeta;
