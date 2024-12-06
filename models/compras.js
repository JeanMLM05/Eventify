const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    productos: [
        {
            tipo: { type: String, required: true },
            cantidad: { type: Number, required: true },
            precio: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true }, // Número de teléfono del comprador
    tarjetaCredito: { // Detalles de la tarjeta de crédito utilizada
        nombre: { type: String, required: true }, // Nombre en la tarjeta
        numero: { type: String, required: true }, // Número de tarjeta (recuerda manejar esto de forma segura)
        expiracion: { type: String, required: true }, // Fecha de expiración (mes/año)
        cvc: { type: String, required: true } // Código de seguridad
    },
    fecha: { type: Date, default: Date.now }
}, { versionKey: false });

let compraModel = mongoose.model('Compras',compraSchema);

module.exports = compraModel;