//Carga la visual de productos al ingresar a la pagina
document.addEventListener('DOMContentLoaded', function () {
    // Verifica si ya existe "productos" en el sessionStorage
    if (!sessionStorage.getItem('productos')) {
        //Crea el arreglo para los productos
        //El listado de productos cuenta con algunos básicos para que no comience vacío
        let productos = [
            {
                id: 0,
                nombre: 'Correas para perro',
                imagen: '../images/productos/correas_perro.jpg',
                descripcion: 'Correa con gancho resistente de 3mts.',
                categoria: 'accesorios'
            },
            {
                id: 1,
                nombre: 'Comedero',
                imagen: '../images/productos/comedero.jpg',
                descripcion: 'Depósito para comida o agua de 20cm de diámetro.',
                categoria: 'accesorios'
            },
            {
                id: 2,
                nombre: 'Cuchita',
                imagen: '../images/productos/cuchita.jpg',
                descripcion: 'Cuchita para mascotas. Tamaño mediano. cubierta con gomaespuma para más comodidad.',
                categoria: 'accesorios'
            },
            {
                id: 3,
                nombre: 'DogChow',
                imagen: '../images/productos/dogChow_alimento.jpg',
                descripcion: 'Purina Dog Chow para perros.',
                categoria: 'alimentos'
            },
            {
                id: 4,
                nombre: 'Excellent',
                imagen: '../images/productos/excelence_alimento.jpg',
                descripcion: 'Purina Excellent para gatos adultos.',
                categoria: 'alimentos'
            },
            {
                id: 5,
                nombre: 'Frontline',
                imagen: '../images/productos/pipeta_frontline.jpg',
                descripcion: 'Pipeta Frontline 5-10kg. Para perros.',
                categoria: 'pipetas'
            },
            {
                id: 6,
                nombre: 'NexGard',
                imagen: '../images/productos/pipeta_nexGard.jpg',
                descripcion: 'Pipeta Frontline 1-50kg. Para perros.',
                categoria: 'pipetas'
            },
        ];

        let productosString = JSON.stringify(productos);
        sessionStorage.setItem('productos', productosString);
    }
    actualizaListaProductos();
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

//Actualiza lista productos para la vista de todos
function actualizaListaProductos() {
    let productosString = sessionStorage.getItem('productos');
    let productosDatos = JSON.parse(productosString);

    let listaProductosDiv = document.getElementById('listaProductos');
    //vacía el listado para generarlo nuevamente
    listaProductosDiv.innerHTML = '';

    let categorias = {};
    //Genera el listado de categorías que hay en los productos
    productosDatos.forEach(function (producto) {
        if (!categorias[producto.categoria]) {
            categorias[producto.categoria] = [];
        }
        categorias[producto.categoria].push(producto);
    });

    //Genera el div de cada categoría con los productos que contiene cada una
    for (let categoria in categorias) {
        let categoriaDiv = document.createElement('div');
        categoriaDiv.id = categoria;

        let h6 = document.createElement('h6');
        h6.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        categoriaDiv.appendChild(h6);

        let ul = document.createElement('ul');
        ul.classList.add('list-group');
        categoriaDiv.appendChild(ul);

        categorias[categoria].forEach(function (producto) {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            ul.appendChild(li);

            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'g-0');
            li.appendChild(rowDiv);

            let colImgDiv = document.createElement('div');
            colImgDiv.classList.add('col-md-4', 'd-md-flex', 'align-items-center');
            rowDiv.appendChild(colImgDiv);

            let img = document.createElement('img');
            img.src = producto.imagen;
            img.classList.add('img-fluid', 'rounded-start', 'imagen-listado');
            img.alt = 'imagen-producto';
            colImgDiv.appendChild(img);

            let colContentDiv = document.createElement('div');
            colContentDiv.classList.add('col-md-8');
            rowDiv.appendChild(colContentDiv);

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            colContentDiv.appendChild(cardBody);

            let h5 = document.createElement('h5');
            h5.classList.add('card-title');
            h5.textContent = producto.nombre;
            cardBody.appendChild(h5);

            let p = document.createElement('p');
            p.classList.add('card-text');
            p.textContent = producto.descripcion;
            cardBody.appendChild(p);
        });

        listaProductosDiv.appendChild(categoriaDiv);
    }
}

//Filtra productos por categorías
document.getElementById('mostrarProductosCategoria').addEventListener('change', function () {
    var select = document.getElementById('mostrarProductosCategoria');
    var categoriaSeleccionada = select.value;

    var divAccesorios = document.getElementById('accesorios');
    var divAlimentos = document.getElementById('alimentos');
    var divPipetas = document.getElementById('pipetas');

    //Muestra u oculta las categorías según la opción seleccionada
    if (categoriaSeleccionada === 'todos') {
        if(divAccesorios){
            divAccesorios.classList.remove('d-none');
        }
        if(divAlimentos){
            divAlimentos.classList.remove('d-none');
        }
        if(divPipetas){
            divPipetas.classList.remove('d-none');
        }
    } else {
        if(divAccesorios){
            divAccesorios.classList.toggle('d-none', categoriaSeleccionada !== 'accesorios');
        }
        if(divAlimentos){
            divAlimentos.classList.toggle('d-none', categoriaSeleccionada !== 'alimentos');
        }
        if(divPipetas){
            divPipetas.classList.toggle('d-none', categoriaSeleccionada !== 'pipetas');
        }
    }
});