//creo el arreglo para los productos
let productos = [];
let form =document.getElementById('formularioProductos');
form.addEventListener('submit', function(e) {
    e.preventDefault(); //Previene el envío del formulario

    //Obtiene los valores del formulario
    let nombre = document.getElementById('nombreProducto').value;
    let descripcion = document.getElementById('descripcionProducto').value;
    let categoria = document.getElementById('categoriaProducto').value;
    let imagen = document.getElementById('imagenProducto').files[0];

    //Crea el objeto para agregar el producto
    let nuevoProducto = {
        id: productos.length, // El id es el índice en el array (autoincrementable)
        nombre: nombre,
        imagen: imagen.name, // Obtiene el nombre del archivo de imagen
        descripcion: descripcion,
        categoria: categoria
    };
    // Agrega el producto al array
    productos.push(nuevoProducto);

    let productosString = JSON.stringify(productos);
    localStorage.setItem('productos', productosString);

    //Resetea el formulario
    form.reset();

});