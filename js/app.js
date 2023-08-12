

const carrito           = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn  = document.querySelector('#vaciar-carrito');
const listaCursos       = document.querySelector('#lista-cursos');

let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // presionado agregas curso
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el HMTL
    });
}


function agregarCurso(e) {
    e.preventDefault(); //para prevenir que se redirrecione

    if( e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);

    }
}


function eliminarCurso(e){
    /* console.log(e.target.classList) */
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');


        //elimina el arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su HTML
    }

}


// Lee el contenido del HTML al que le dimos click y estrae la informacion
//curso

function leerDatosCurso(a){
/*     console.log(a);
 */
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: a.querySelector('img').src,
        titulo: a.querySelector('h4').textContent,
        parrafo: a.querySelector('p').textContent,
        precio: a.querySelector('.precio span').textContent,
        id: a.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos que no son duplicados
            }
        } );
        articulosCarrito = [...cursos];
    }else {
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(existe);




    //agrega elementos al arreglo de carrito
    

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el Carrito de compras en el HTML

function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach( curso =>{
        const {imagen, titulo, precio, cantidad, id} = curso;
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${curso.imagen}' width='100px' >   
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class='borrar-curso' data-id='${id}'>X</a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}


//Elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}

