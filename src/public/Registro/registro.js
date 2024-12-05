//------- GUARDAMOS HTML CON EL DOM

const $formulario = document.getElementById('formulario');
const $inputs = document.querySelectorAll('#formulario input, #formulario select');

//------EXPRESIONES REGULARES

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Aceptar letras mayúsculas y minúsculas con y sin acento, acepte espacios, mínimo 3 y máximo 40
    apellidos: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Aceptar letras mayúsculas y minúsculas con y sin acento, acepte espacios, mínimo 3 y máximo 40
    password: /^.{4,12}$/, // Aceptar todo pero con un mínimo 4 y máximo 12
    correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, // Acepta la estructura planteada de correo
    nacimiento: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, // Formato de fecha YYYY-MM-DD
    idd: /^\d{8,12}$/, // Acepta mínimo 8 y máximo 10
    provincia: /[1-7]/,
    tipoid: /^(cedula|dimex|pasaporte)$/ // Acepta tipo de ID
}

//------- Objeto con los campos
const campos = {
    nombre: false,
    apellidos: false,
    password: false,
    correo: false,
    idd: false,
    nacimiento: false,
    tipoid: false,
    provincia: false,
    canton: false
}


//---------Clasifica en cual input vamos a trabajar

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "apellidos":
            validarCampo(expresiones.apellidos, e.target, "apellidos");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "password");
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "nacimiento":
            validarCampo(expresiones.nacimiento, e.target, "nacimiento");
            break;
        case "idd":
            validarCampo(expresiones.idd, e.target, "idd");
            break;
        case "provincia":
            validarCampo(expresiones.provincia, e.target, "provincia");   
        case "tipoid":
            validarCampo(expresiones.tipoid, e.target, "tipoid");
            break;
            case "canton":
                campos.canton = e.target.value !== ""; // Validar que no esté vacío
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

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo-password2`).classList.add("formulario--grupo-incorrecto");
        document.getElementById(`grupo-password2`).classList.remove("formulario--grupo-correcto");
        document.querySelector(`#grupo-password2 i`).classList.add("fa-times-circle");
        document.querySelector(`#grupo-password2 i`).classList.remove("fa-check-circle");
        document.querySelector(`#grupo-password2 .formulario--input-error`).classList.add("formulario--input-error-activo");
        campos.password = false;
    } else {
        document.getElementById(`grupo-password2`).classList.remove("formulario--grupo-incorrecto");
        document.getElementById(`grupo-password2`).classList.add("formulario--grupo-correcto");
        document.querySelector(`#grupo-password2 i`).classList.remove("fa-times-circle");
        document.querySelector(`#grupo-password2 i`).classList.add("fa-check-circle");
        document.querySelector(`#grupo-password2 .formulario--input-error`).classList.remove("formulario--input-error-activo");
        campos.password = true;
    }
}

$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario); // Keyup evento cuando presionamos una tecla
    input.addEventListener("blur", validarFormulario); // Blur cuando quitamos el cursor/selección
});

//------- Validar el envío de los datos / solo frontend
/*const validarForm = () => {

    $formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que se recargue la página

        const $terminos = document.getElementById("terminos");

        // Imprimir el estado de cada campo
        console.log(campos);
        console.log($terminos.checked);

        if (campos.nombre && campos.apellidos && campos.correo && campos.password && campos.idd && campos.nacimiento && campos.tipoid && campos.provincia && campos.canton && $terminos.checked) {
            document.getElementById("formulario--mensaje").classList.remove("formulario--mensaje-activo");
            document.getElementById("formulario--mensaje-exito").classList.add("formulario--mensaje-exito-activo");

            setTimeout(() => {
                
                location.reload();
            }, 8000);
        } else {
            document.getElementById("formulario--mensaje").classList.add("formulario--mensaje-activo");
        }
    })
};*/

$(document).ready(function () {
    // Obtener provincias al cargar la página
    $.ajax({
        url: "https://ubicaciones.paginasweb.cr/provincias.json",
        dataType: "json",
        success: function(data) {
            var provinciaSelect = $('#provincia');
            $.each(data, function(key, value) {
                provinciaSelect.append('<option value="'+ key +'">'+ value +'</option>');
            });
        },
        error: function() {
            alert("Error al cargar las provincias.");
        }
    });

    // Obtener cantones según la provincia seleccionada
    $('#provincia').change(function() {
        var provinciaId = $(this).val();
        var cantonSelect = $('#canton');

        if (provinciaId) {
            // Limpiar el selector de cantones y deshabilitar temporalmente
            cantonSelect.empty().append('<option value="">Seleccione un cantón</option>').prop('disabled', true);

            // Llamada a la API para obtener cantones
            $.ajax({
                url: 'https://ubicaciones.paginasweb.cr/provincia/' + provinciaId + '/cantones.json',
                dataType: 'json',
                success: function(data) {
                    $.each(data, function(key, value) {
                        cantonSelect.append('<option value="'+ key +'">'+ value +'</option>');
                    });
                    cantonSelect.prop('disabled', false); // Habilitar el selector de cantones
                },
                error: function() {
                    alert("Error al cargar los cantones.");
                }
            });
        } else {
            // Si no se selecciona provincia, deshabilitar el selector de cantones
            cantonSelect.empty().append('<option value="">Seleccione un cantón</option>').prop('disabled', true);
        }
    });
});