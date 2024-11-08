//------- GUARDAMOS HTML CON EL DOM

const $formulario = document.getElementById('formulario');
const $inputs = document.querySelectorAll('#formulario input, #formulario select');

//------EXPRESIONES REGULARES

const expresiones = {
    correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, // Acepta la estructura planteada de correo
    password: /^.{4,12}$/ // Aceptar todo pero con un mínimo 4 y máximo 12
}

//------- Objeto con los campos
const campos = {
    correo: false,
    password: false
}

//---------Clasifica en cual input vamos a trabajar

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            break;    
    }
}        

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo-${campo}`).classList.remove("formulario--grupo-incorrecto");
        document.getElementById(`grupo-${campo}`).classList.add("formulario--grupo-correcto");
        document.querySelector(`#grupo-${campo} .formulario--input-error`).classList.remove("formulario--input-error-activo");
        campos[campo] = true;
    } else {
        document.getElementById(`grupo-${campo}`).classList.add("formulario--grupo-incorrecto");
        document.getElementById(`grupo-${campo}`).classList.remove("formulario--grupo-correcto");
        document.querySelector(`#grupo-${campo} .formulario--input-error`).classList.add("formulario--input-error-activo");
        campos[campo] = false;
    }
}


$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario); // Keyup evento cuando presionamos una tecla
    input.addEventListener("blur", validarFormulario); // Blur cuando quitamos el cursor/selección
});

//------- Validar el envío de los datos

$formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const $terminos = document.getElementById("terminos");

    // Imprimir el estado de cada campo
    console.log(campos);
    console.log($terminos.checked);

    if (campos.correo && campos.password) {
        document.getElementById("formulario--mensaje").classList.remove("formulario--mensaje-activo");
        document.getElementById("formulario--mensaje-exito").classList.add("formulario--mensaje-exito-activo");

        setTimeout(() => {
            window.location.href = "../PagLandingPageUsuario/PagLandingPageUsuario.html";
            // location.reload();
        }, 4000);
    } else {
        document.getElementById("formulario--mensaje").classList.add("formulario--mensaje-activo");
    }
});