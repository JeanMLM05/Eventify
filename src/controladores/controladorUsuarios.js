const Usuario = require('../modelos/usuario'); // Importa el modelo Usuario

// Función para crear un usuario
const crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body); // Crear un usuario con los datos enviados
    await usuario.save(); // Guardar el usuario en MongoDB
    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Manejo de errores
  }
};

module.exports = { crearUsuario };
