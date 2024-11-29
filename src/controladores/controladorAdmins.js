const Admin = require('../modelos/admin'); // Importa el modelo Admin

// Función para crear un administrador
const crearAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body); // Crear un administrador con los datos enviados
    await admin.save(); // Guardar el administrador en MongoDB
    res.status(201).json({ mensaje: 'Administrador creado correctamente', admin });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Manejo de errores
  }
};

module.exports = { crearAdmin };
