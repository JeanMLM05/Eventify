const $formulario = document.getElementById('formulario'); // contiene todos los elementos dentro del form con id="formulario"
const $inputs = document.querySelectorAll('#formulario input'); // contiene todos los inputs dentro del formulario

//------- VALIDACIONES -------//

// Crear expresiones regulares para validar cada campo
const expresiones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
    apellido: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
    identificacion: /^[0-9]{8,10}$/, // Solo números, entre 8 y 10 caracteres
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato válido de correo
    fechanacimiento: /^\d{4}-\d{2}-\d{2}$/, // Fecha en formato AAAA-MM-DD
    provincia: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,50}$/, // Letras y espacios, mínimo 3 caracteres
    canton: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{3,50}$/, // Letras y espacios, mínimo 3 caracteres
};

// Crear un objeto para llevar el control de los campos
const campos = {
    nombre: false,
    apellido: false,
    idd: false,
    correo: false,
    fechanacimiento: false,
    provincia: false,
    canton: false,
};

//------- FUNCIONES -------//

// Validar formulario por campo
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "apellido");
            break;
        case "idd":
            validarCampo(expresiones.identificacion, e.target, "idd");
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "fechanacimiento":
            validarCampo(expresiones.fechanacimiento, e.target, "fechanacimiento");
            break;
        case "provincia":
            validarCampo(expresiones.provincia, e.target, "provincia");
            break;
        case "canton":
            validarCampo(expresiones.canton, e.target, "canton");
            break;
    }
};

// Validar campo específico
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-incorrecto");
        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-correcto");
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove("formulario-input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-incorrecto");
        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-correcto");
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add("formulario-input-error-activo");
        campos[campo] = false;
    }
};

//------- EVENTOS -------//

// Escuchar eventos en cada input
$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

// Validar el envío del formulario
/* $formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
        campos.nombre &&
        campos.apellido &&
        campos.idd &&
        campos.correo &&
        campos.fechanacimiento &&
        campos.provincia &&
        campos.canton
    ) {
        document.getElementById("formulario-mensaje-exito").classList.add("formulario-mensaje-exito-activo");
        setTimeout(() => {
            window.location.href = "/MiPerfilA"; // Redirigir a la página del perfil tras guardar
        }, 4000);
    }
}); */