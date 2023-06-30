
"use strict"

//***********************************/
//aqui se corrobora el login



const usuarios = [
    {
        "mail": "natalia@gmail",
        "contrasena": 1234
    },
    {
        "mail": "mariano@gmail",
        "contrasena": 1235
    },
    {
        "mail": "sofia@gmail",
        "contrasena": 1236
    }
]
//creamos una funcion que genere un captcha de letras
function generarCaptcha() {
    const letras = "aAbBcCdDeEfFgGhHiIjJkKlLmMnoOpPqQrRsStTuUvVwWxXyYzZ";
    let password = "";
    for (let i = 0; i < 5; i++) {
        let aleatorio = Math.floor(Math.random() * letras.length);
        password += letras.charAt(aleatorio);
    }
    return password;
}
//cuando cargue el documento "login" se carga el captcha
let nuevoCaptcha = document.getElementById("captcha-generator");
document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    nuevoCaptcha.innerHTML = generarCaptcha();
})

//cuando se necesite refrescar el captcha, se hace click en el btn.
let btnRefreshCaptcha = document.getElementById("reload-btn");
btnRefreshCaptcha.addEventListener("click", (e) => {
    e.preventDefault;
    nuevoCaptcha.innerHTML = generarCaptcha();
});

//funcion comprobar captcha. 
let acceso = Boolean;

function comprobar_captcha(captchaActual, captchaIngresado, acceso) {
    if (captchaActual == captchaIngresado) {
        acceso = true;
    } else {
        acceso = false;
    }
    return acceso;
}

//configurar el boton ingresar, para direccionar a inventario.html.

let btnIngresar = document.getElementById("btnIngresar");
btnIngresar.addEventListener("click", (e) => {
    e.preventDefault();
    //traemos los valores ingresados, usuario, contraseña y captcha.
    let usuario_ingresado = document.getElementById("usuario").value;
    let contrasena_ingresada = document.getElementById("contrasena").value;
    let captchaIngresado = document.getElementById("captchaIngresado").value;
    let captchaActual = document.getElementById("captcha-generator").textContent;

    if (comprobar_captcha(captchaActual, captchaIngresado, acceso) == true) {
        //con el for, busca dentro del arreglo si coinciden los valores usuario y contraseña ingresados.
        if (usuario_ingresado.length && contrasena_ingresada.length) {
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].mail == usuario_ingresado && usuarios[i].contrasena == contrasena_ingresada) {
                    document.getElementById("aviso").innerHTML = ""
                    window.location.href = "../carpeta-html/inventario.html";
                }
            }

        }else{ 
            document.getElementById("aviso").innerHTML = "Usuario y o contraseña incorrectos. Intente nuevamente." //avisa que hay error
        }
    }else {
        document.getElementById("aviso").innerHTML = "Captcha incorrecto";
    }
})


//***********************************************************/



