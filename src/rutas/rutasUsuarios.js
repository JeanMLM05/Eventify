const express = require('express');
const router = express.Router();
const controladorUsuarios = require('../controladores/controladorUsuarios'); // Importa el controlador

// Ruta para crear un usuario
router.post('/', controladorUsuarios.crearUsuario);

module.exports = router;
