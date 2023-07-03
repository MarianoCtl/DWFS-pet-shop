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

        //Convierte el JSON a una cadena
        let productosString = JSON.stringify(productos);
        //Almacena la cadena en el sessionStorage
        sessionStorage.setItem('productos', productosString);
    }

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

    actualizaListaProductos();
});

//Agrega nuevo producto
let form = document.getElementById('formularioProductos');
form.addEventListener('submit', function (e) {
    e.preventDefault(); //Previene el envío del formulario

    let productosString = sessionStorage.getItem('productos');
    let productosDatos = JSON.parse(productosString);

    //obtengo el último id para sumar 1
    let ultimoID = 0;
    productosDatos.forEach(function(productos) {
        if (productos.id >= ultimoID) {
            ultimoID = productos.id + 1;
        }
    });
    
    //Obtiene los valores del formulario
    let nombre = document.getElementById('nombreProducto').value;
    let descripcion = document.getElementById('descripcionProducto').value;
    let categoria = document.getElementById('categoriaProducto').value;
    let imagen = document.getElementById('imagenProducto').files[0];
    let reader = new FileReader();

    reader.onload = function() {
        let dataURL = reader.result;
        //Crea el objeto para agregar el producto
        let nuevoProducto = {
            id: ultimoID,
            nombre: nombre,
            imagen: dataURL,
            descripcion: descripcion,
            categoria: categoria
        };
        // Agrega el producto al array
        productosDatos.push(nuevoProducto);

        let productosString = JSON.stringify(productosDatos);
        sessionStorage.setItem('productos', productosString);
        //Llama a la funcion para generar la vista
        actualizaListaProductos();
    };

    reader.readAsDataURL(imagen);
    //Resetea el formulario
    form.reset();   
});

//Actualiza lista productos para la vista de todos
function actualizaListaProductos() {
    let productosString = sessionStorage.getItem('productos');
    let productosDatos = JSON.parse(productosString);

    let listaProductosDiv = document.getElementById('listaProductos');
    //vacía el listado para generarlo nuevamente
    listaProductosDiv.innerHTML = '';

    let categorias = {};
    //Genera el listado de categorías que hay en los productos (para que no muestre categorías vacías)
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

        //Lista los productos correspondientes a la categoría
        categorias[categoria].forEach(function (producto) {
            let li = document.createElement('li');
            li.classList.add('list-group-item');
            ul.appendChild(li);

            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row', 'g-0');
            li.appendChild(rowDiv);

            //Div de la imagen
            let colImgDiv = document.createElement('div');
            colImgDiv.classList.add('col-md-3', 'd-md-flex', 'align-items-center');
            rowDiv.appendChild(colImgDiv);

            let img = document.createElement('img');
            img.src = producto.imagen;
            img.classList.add('img-fluid', 'rounded-start', 'imagen-listado');
            img.alt = 'imagen-producto';
            colImgDiv.appendChild(img);

            //Div del nombre y descripcion
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

            //Div de los botones
            let colBtnDiv = document.createElement('div');
            colBtnDiv.classList.add('col-md-1', 'd-md-flex', 'align-items-center', 'justify-content-center', 'flex-column');
            rowDiv.appendChild(colBtnDiv);

            let btnGroupDiv = document.createElement('div');
            btnGroupDiv.classList.add('btn-group-vertical');
            colBtnDiv.appendChild(btnGroupDiv);

            let modificarBtn = document.createElement('button');
            modificarBtn.type = 'button';
            modificarBtn.classList.add('btn', 'btn-sm', 'btn-primary');
            modificarBtn.textContent = 'Modificar';
            modificarBtn.setAttribute('data-bs-toggle', 'modal');
            modificarBtn.setAttribute('data-bs-target', '#modificarModal')
            btnGroupDiv.appendChild(modificarBtn);

            let eliminarBtn = document.createElement('button');
            eliminarBtn.type = 'button';
            eliminarBtn.classList.add('btn', 'btn-sm', 'btn-danger');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.setAttribute('data-bs-toggle', 'modal');
            eliminarBtn.setAttribute('data-bs-target', '#eliminarModal')
            btnGroupDiv.appendChild(eliminarBtn);

            let checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('text-center');
            colBtnDiv.appendChild(checkboxDiv);

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.id = 'checkbox' + producto.id;
            checkbox.setAttribute('data-id', producto.id);
            checkboxDiv.appendChild(checkbox);

            //Genera el contenido del modal Eliminar para cada producto
            eliminarBtn.addEventListener('click', function() {
                let modalBody = document.querySelector('#eliminarModal .modal-body');
                modalBody.innerHTML = '';
        
                let productTitle = document.createElement('h6');
                productTitle.textContent = '¿Está seguro que desea eliminar el producto?';
                modalBody.appendChild(productTitle);

                let productName = document.createElement('p');
                productName.textContent = 'Nombre del producto: ' + producto.nombre;
                modalBody.appendChild(productName);
        
                let productDescription = document.createElement('p');
                productDescription.textContent = 'Descripción: ' + producto.descripcion;
                modalBody.appendChild(productDescription);
        
                let productCategory = document.createElement('p');
                productCategory.textContent = 'Categoría: ' + producto.categoria;
                modalBody.appendChild(productCategory);

                //Footer del modal
                let hrDiv = document.createElement('hr');
                modalBody.appendChild(hrDiv);

                let footerMdiv = document.createElement('div');
                footerMdiv.classList.add('d-md-flex', 'justify-content-end');
                modalBody.appendChild(footerMdiv);

                let cancelarBtnM = document.createElement('button');
                cancelarBtnM.type = 'button';
                cancelarBtnM.classList.add('btn', 'btn-sm', 'btn-secondary', 'm-1');
                cancelarBtnM.textContent = 'Cancelar';
                cancelarBtnM.setAttribute('data-bs-dismiss', 'modal');
                footerMdiv.appendChild(cancelarBtnM);

                let eliminarBtnM = document.createElement('button');
                eliminarBtnM.type = 'button';
                eliminarBtnM.classList.add('btn', 'btn-sm', 'btn-danger', 'm-1');
                eliminarBtnM.textContent = 'Eliminar';
                eliminarBtnM.id = 'eliminarBtn' + producto.id;
                footerMdiv.appendChild(eliminarBtnM);

                //Elimina dentro del modal
                let eliminarBtnConfirmacion = document.getElementById('eliminarBtn' + producto.id);
                eliminarBtnConfirmacion.addEventListener('click', function() {
                    // Asigna el index del producto buscando el correspondiente por id
                    let index = productosDatos.findIndex(function(item) {
                        return item.id === producto.id;
                    });
                    
                    // Elimina el producto del array de productos si es que lo encuentra
                    if (index !== -1) {
                        productosDatos.splice(index, 1);
                    }

                    let productosString = JSON.stringify(productosDatos);
                    sessionStorage.setItem('productos', productosString);
                    
                    // Cierra el modal
                    let eliminarModal = document.getElementById('eliminarModal');
                    let modal = bootstrap.Modal.getInstance(eliminarModal);
                    modal.hide();
                    actualizaListaProductos();
                });
            });            

            //Genera el contenido del modal Modificar para cada producto
            modificarBtn.addEventListener('click', function() {
                let modalBody = document.querySelector('#modificarModal .modal-body');
                modalBody.innerHTML = '';

                //Genera el formulario
                let form = document.createElement('form');
                form.id = 'modificarProducto'+ producto.id;
                modalBody.appendChild(form);


                //Nombre
                let nombreLabel = document.createElement('label');
                nombreLabel.textContent = 'Nombre';
                nombreLabel.classList.add('form-label');
                form.appendChild(nombreLabel);

                let nombreInput = document.createElement('input');
                nombreInput.type = 'text';
                nombreInput.classList.add('form-control', 'form-control-sm');
                nombreInput.id = 'nombreProductoM';
                nombreInput.placeholder = 'Ingrese el nombre';
                nombreInput.value = producto.nombre;
                nombreInput.required = true;
                form.appendChild(nombreInput);

                //Imagen
                let imagenLabel = document.createElement('label');
                imagenLabel.textContent = 'Imagen';
                imagenLabel.classList.add('form-label');
                form.appendChild(imagenLabel);

                let imagenInput = document.createElement('input');
                imagenInput.type = 'file';
                imagenInput.classList.add('form-control', 'form-control-sm');
                imagenInput.id = 'imagenProductoM';
                form.appendChild(imagenInput);

                let img = document.createElement('img');
                img.src = producto.imagen;
                img.classList.add('img-fluid', 'rounded-start', 'imagen-listado');
                img.alt = 'imagen-producto';
                form.appendChild(img);

                let br = document.createElement('br');
                form.appendChild(br);

                //Descripción
                let descripcionLabel = document.createElement('label');
                descripcionLabel.textContent = 'Descripción';
                descripcionLabel.classList.add('form-label');
                form.appendChild(descripcionLabel);

                let descripcionTextarea = document.createElement('textarea');
                descripcionTextarea.classList.add('form-control', 'form-control-sm');
                descripcionTextarea.placeholder = 'Ingrese la descripción';
                descripcionTextarea.id = 'descripcionProductoM';
                descripcionTextarea.value = producto.descripcion;
                descripcionTextarea.required = true;
                form.appendChild(descripcionTextarea);

                //Categoría
                let categoriaLabel = document.createElement('label');
                categoriaLabel.textContent = 'Categoría';
                categoriaLabel.classList.add('form-label');
                form.appendChild(categoriaLabel);

                let categoriaSelect = document.createElement('select');
                categoriaSelect.classList.add('form-select', 'form-select-sm');
                categoriaSelect.id = 'categoriaProductoM';
                categoriaSelect.required = true;
                form.appendChild(categoriaSelect);

                //Opciones del select
                let opcionSeleccionar = document.createElement('option');
                opcionSeleccionar.value = '';
                opcionSeleccionar.disabled = true;
                opcionSeleccionar.textContent = 'Seleccione una categoría';
                categoriaSelect.appendChild(opcionSeleccionar);

                let opcionAccesorios = document.createElement('option');
                opcionAccesorios.value = 'accesorios';
                if(opcionAccesorios.value == producto.categoria){
                    opcionAccesorios.selected = true;
                }
                opcionAccesorios.textContent = 'Accesorios';
                categoriaSelect.appendChild(opcionAccesorios);

                let opcionAlimentos = document.createElement('option');
                opcionAlimentos.value = 'alimentos';
                if(opcionAlimentos.value == producto.categoria){
                    opcionAlimentos.selected = true;
                }
                opcionAlimentos.textContent = 'Alimentos';
                categoriaSelect.appendChild(opcionAlimentos);

                let opcionPipetas = document.createElement('option');
                opcionPipetas.value = 'pipetas';
                if(opcionPipetas.value == producto.categoria){
                    opcionPipetas.selected = true;
                }
                opcionPipetas.textContent = 'Pipetas';
                categoriaSelect.appendChild(opcionPipetas);

                //Footer del modal
                let hrDiv = document.createElement('hr');
                form.appendChild(hrDiv);

                let footerMdiv = document.createElement('div');
                footerMdiv.classList.add('d-md-flex', 'justify-content-end');
                form.appendChild(footerMdiv);

                let cancelarBtnM = document.createElement('button');
                cancelarBtnM.type = 'button';
                cancelarBtnM.classList.add('btn', 'btn-sm', 'btn-secondary', 'm-1');
                cancelarBtnM.textContent = 'Cancelar';
                cancelarBtnM.setAttribute('data-bs-dismiss', 'modal');
                footerMdiv.appendChild(cancelarBtnM);

                // Botón modificar
                let modificarButton = document.createElement('button');
                modificarButton.type = 'submit';
                modificarButton.classList.add('btn', 'btn-sm', 'btn-warning', 'm-1');
                modificarButton.id = 'modificarProducto' + producto.id;
                modificarButton.textContent = 'Modificar';
                footerMdiv.appendChild(modificarButton);

                // Modificar modal
                let formModificarProducto = document.getElementById('modificarProducto' + producto.id);

                // Agrega el evento de escucha submit al formulario
                formModificarProducto.addEventListener('submit', function(event) {
                    event.preventDefault(); // Evita el envío del formulario

                    // Obtiene los valores actualizados del formulario
                    let nombre = document.getElementById('nombreProductoM').value;
                    let descripcion = document.getElementById('descripcionProductoM').value;
                    let categoria = document.getElementById('categoriaProductoM').value;
                    let imagen = document.getElementById('imagenProductoM').files[0];

                    // Asigna el index del producto buscando el correspondiente por id
                    let indexProducto = productosDatos.findIndex(function(item) {
                        return item.id === producto.id;
                    });

                    if(indexProducto !== -1){
                        //Si hay imagen nueva tiene que usar el FileReader()
                        if(imagen){
                            let reader = new FileReader();

                            reader.onload = function() {
                                let dataURL = reader.result;

                                productosDatos[indexProducto].nombre = nombre;
                                productosDatos[indexProducto].imagen = dataURL;
                                productosDatos[indexProducto].descripcion = descripcion;
                                productosDatos[indexProducto].categoria = categoria;

                                
                                let productosString = JSON.stringify(productosDatos);
                                sessionStorage.setItem('productos', productosString);
                                actualizaListaProductos();
                            };
                            reader.readAsDataURL(imagen);
                        }else{
                            productosDatos[indexProducto].nombre = nombre;
                            productosDatos[indexProducto].descripcion = descripcion;
                            productosDatos[indexProducto].categoria = categoria;

                            let productosString = JSON.stringify(productosDatos);
                            sessionStorage.setItem('productos', productosString);
                            actualizaListaProductos();
                        }
                    }

                    // Cierra el modal
                    let modificarModal = document.getElementById('modificarModal');
                    let bootstrapModal = bootstrap.Modal.getInstance(modificarModal);
                    bootstrapModal.hide();
                });
            });            
        });
        //Completa el div de la categoría
        listaProductosDiv.appendChild(categoriaDiv);
    }
}

//Elimina los productos seleccionados
let eliminarSeleccionados = document.getElementById('eliminarSeleccionados');
eliminarSeleccionados.addEventListener('click', function() {
    let productosString = sessionStorage.getItem('productos');
    let productosDatos = JSON.parse(productosString);

    let checkboxs = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxs.forEach((check)=>{
        let id = parseInt(check.getAttribute('data-id'));

        // Asigna el index del producto buscando el correspondiente por id
        let index = productosDatos.findIndex(function(item) {
            return item.id === id;
        });
        // Elimina el producto del array de productos si es que lo encuentra
        if (index !== -1) {
            productosDatos.splice(index, 1);
        }
    });
    productosString = JSON.stringify(productosDatos);
    sessionStorage.setItem('productos', productosString);
    
    actualizaListaProductos();

    // Cierra el modal
    let modalEliminarSeleccionados = document.getElementById('eliminarSeleccionadosModal');
    let bootstrapModal = bootstrap.Modal.getInstance(modalEliminarSeleccionados);
    bootstrapModal.hide();
});

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
