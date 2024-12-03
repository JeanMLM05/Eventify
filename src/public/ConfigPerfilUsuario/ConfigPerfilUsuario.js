const $formulario = document.getElementById('formulario') // contiene todos los elementos dentro del form, con id="formulario"
const $inputs = document.querySelectorAll('#formulario input') //contiene todos los inputs dentro de formulario


//------- VALIDACIONES -------//

//crear expresiones
const expresiones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ,.\s]{8,50}$/,
    identificacion: /^[0-9]{9,14}$/,
    correo: /^[a-zA-Z0-9,.\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    fechanacimiento: /^[0-9\-]{10}$/,
    residencia: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ,.\s]{6,50}$/
}

//crear campos
const campos = {
    nombre: false,
    identificacion: false,
    correo: false,
    fechanacimiento: false,
    residencia: false
}


//------- FUNCIONES -------//

//validarFormulario --> clasifica en cuál input vamos a trabajar
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "identificacion":
            validarCampo(expresiones.identificacion, e.target, "identificacion");
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "fechanacimiento":
            validarCampo(expresiones.fechanacimiento, e.target, "fechanacimiento");
            break;
        case "residencia":
            validarCampo(expresiones.residencia, e.target, "residencia");
            break;
    }
}


const validarCampo = (expresion, input, campo) => {

    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-incorrecto");

        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-correcto");

        //poner el mensaje de error
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove("formulario-input-error-activo");

        campos[campo] = true;

    } else {
        document.getElementById(`grupo-${campo}`).classList.add("formulario-grupo-incorrecto");

        document.getElementById(`grupo-${campo}`).classList.remove("formulario-grupo-correcto");

        //poner el mensaje de error
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add("formulario-input-error-activo");

        campos[campo] = false;
    }
}

//------- EVENTOS -------//

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario)
    input.addEventListener("blur", validarFormulario)
})

//---- Validar el envío de los datos ----//
$formulario.addEventListener("submit", (e) => {
    e.preventDefault();


    if (campos.nombre && campos.identificacion && campos.correo && campos.fechanacimiento && campos.residencia) {
        document.getElementById("formulario-mensaje-exito-activo").classList.add("formulario-mensaje-exito-activo");

        setTimeout(() => {
            window.location.href = "/MiPerfilU";
        }, 5000)
    } else {
        location.reload();
    }
})