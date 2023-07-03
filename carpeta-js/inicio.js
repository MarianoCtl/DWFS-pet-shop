
document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('login')) {
        let userString = sessionStorage.getItem('login');
        let userDatos = JSON.parse(userString);
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '<a class="nav-link" href="inventario.html">Inventario</a>';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<h6 class="m-2">'+userDatos.nombre+'</h6><button class="btn btn-outline-warning" id="salirBtn">Salir</button>';
        //Salir
        let salirBtn = document.getElementById('salirBtn');
        salirBtn.addEventListener('click', function() {
            sessionStorage.removeItem('login');
            window.location.href = "../carpeta-html/inicio.html";
        });
    }else{
        let navInventario = document.getElementById('navInventario');
        navInventario.innerHTML = '';
        let navNombre = document.getElementById('navLog');
        navNombre.innerHTML = '<a class="btn btn-outline-warning" href="login.html">Ingresar</a>';
    }
    
});

