const express = require('express');
const router = express.Router();
const controladorAdmins = require('../controladores/controladorAdmins'); // Importa el controlador

// Ruta para crear un administrador
router.post('/', controladorAdmins.crearAdmin);

module.exports = router;
