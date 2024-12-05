const Usuario = require('../models/usuarios.js');
const Administrador = require('../models/administradores.js');

const validarInicioSesion = async (correo, contrasenna) => {
    try {
        const administrador = await validarAdministrador(correo, contrasenna);
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

    const contrasenaValida = await compare(contrasenna, usuario.contrasenna);
    if (!contrasenaValida) {
        throw new Error("Correo o contraseña inválida");
    }

    return usuario;
};

const validarAdministrador = async (correo, contrasenna) => {
    const administrador = await Administrador.findOne({ correo });
    if (!administrador) {
        throw new Error("Correo o contraseña inválida");
    }

    const contrasenaValida = await compare(contrasenna, administrador.contrasenna);
    if (!contrasenaValida) {
        throw new Error("Correo o contraseña inválida");
    }

    return administrador;
};

module.exports = { validarInicioSesion };


const buscarUsuario = async (correo) => {
    return await Usuario.findOne({ correo });
};