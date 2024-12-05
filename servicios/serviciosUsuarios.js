const Usuario = require('../models/usuarios.js');
const Administrador = require('../models/administradores.js');

const validarInicioSesion = async (correo, contrasenna) => {
    try {
        const administrador = await validarAdministrador(correo, contrasenna);
        console.log("Administrador encontrado:", administrador);  // Depuración
        return {
            tipo: "administrador",
            datos: administrador
        };
    } catch (error) {
        if (error.message !== "Correo o contraseña inválida") {
            throw error;
        }
    }

    try {
        const usuario = await validarUsuario(correo, contrasenna);
        console.log("Usuario encontrado:", usuario);  // Depuración
        return {
            tipo: "usuario",
            datos: usuario
        };
    } catch (error) {
        throw new Error("Correo o contraseña inválida");
    }
};

const validarUsuario = async (correo, contrasenna) => {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
        throw new Error("Correo o contraseña inválida");
    }

    if (usuario.contrasenna !== contrasenna) {
        throw new Error("Correo o contraseña inválida");
    }

    return usuario;
};

const validarAdministrador = async (correo, contrasenna) => {
    const administrador = await Administrador.findOne({ correo });
    if (!administrador) {
        throw new Error("Correo o contraseña inválida");
    }

    // Comparación directa sin encriptación
    if (administrador.contrasenna !== contrasenna) {
        throw new Error("Correo o contraseña inválida");
    }

    return administrador;
};

module.exports = { validarInicioSesion };


const buscarUsuario = async (correo) => {
    return await Usuario.findOne({ correo });
};