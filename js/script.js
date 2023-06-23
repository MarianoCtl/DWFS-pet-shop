
"use strict"

let btnMenu= document.getElementById("btnMenu");
let menu=document.getElementById("nav");

btnMenu.addEventListener("click",()=>{
    menu.classList.toggle("abrirMenu");
} )

let esconder_menu=document.getElementById("seccion1");
esconder_menu.addEventListener("click",()=>{menu.classList.remove("abrirMenu")})
//***********************************/
//aqui se corrobora el login



const usuarios=[
    {"usuario":"natalia",
    "contraseña":1234
    },
    {"usuario":"mariano", 
    "contraseña":1235
    },
    { "usuario":"sofia",
    "contraseña":1236
    }
];


let btnIngresar=document.getElementById("btnIngresar");



btnIngresar.addEventListener("click", (e)=>{
    e.preventDefault();
    let usuario_ingresado=document.getElementById("usuario").value;
    let contrasena_ingresada=document.getElementById("contraseña").value;
   
    for(let i=0; i<usuarios.length;i++){
        if(usuarios[i].usuario==usuario_ingresado && usuarios[i].contraseña==contrasena_ingresada){
        console.log("acceso concedido");

        document.getElementById("formulario").reset();
        document.getElementById("aviso").innerHTML="";
        break;
        }else{
        document.getElementById("aviso").innerHTML="Usuario y o contraseña incorrectos. Intente nuevamente."
        }
    }
   
})

