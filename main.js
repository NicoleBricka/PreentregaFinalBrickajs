const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const crearTarjetaProducto = (producto) => {
    const containerProductos = document.getElementById("containerProductos")
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.id = producto.id
    tarjeta.innerHTML = `
                            <h3>${producto.titulo}</h3>
                            <img src="${producto.imagen}"/>
                            <p>${producto.descripcion}</p>
                            <span>${producto.precio}</span>
                            <input class="cantidad" type="number" max="${producto.stock}" min="1" value="1"/>
                            <button class="btn-agregar-carrito">Agregar</button>

    `
    containerProductos.append(tarjeta)


}


const crearTarjetaProductoCarrito = (producto) => {
    const carritoProductos = document.getElementById("carritoProductos")
    const tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.id = `carrito-${producto.id}`
    tarjeta.innerHTML = `
                            <h3>${producto.titulo}</h3>
                            <img src="${producto.imagen}"/>
                            <p>${producto.descripcion}</p>
                            <span>${producto.precio}</span>
                            <button class="btn-eliminar-producto-carrito">Eliminar</button>
                            <button class="btn-comprar">Comprar</button>

    `
    carritoProductos.append(tarjeta)


}

const traerProductos = async () => {
    try {
        const respuesta = await fetch("./productos.json")
        const productos = await respuesta.json()
        productos.forEach(producto => {
            crearTarjetaProducto(producto)
        })
        return productos
    } catch (error) {
        console.log("error")
    }
}

const agregarProductoCarrito = (productos) => {
    const containerProductos = document.getElementById("containerProductos")
    containerProductos.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("btn-agregar-carrito")) {
            const parentElement = event.target.parentElement
            const id = parentElement.id
            const cantidad = parentElement.getElementsByClassName("cantidad")[0].value
            const producto = productos.find(producto => producto.id == id)
            carrito.push({ ...producto, cantidad })
            localStorage.setItem("carrito", JSON.stringify(carrito))
            Swal.fire("Producto agregado al carrito!");
            actualizarVistaCarrito()
        }
    })

}

const verCarrito = () => {

    carrito.forEach(producto => {
        crearTarjetaProductoCarrito(producto)
    })
}

const actualizarVistaCarrito = () => {
    const carritoProductos = document.getElementById("carritoProductos")
    carritoProductos.innerHTML = ""
    carrito.forEach(producto => {
        crearTarjetaProductoCarrito(producto)
    })
}

const eliminarProductoCarrito = () => {
    const carritoProductos = document.getElementById("carritoProductos")
    carritoProductos.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("btn-eliminar-producto-carrito")) {
            const parentElement = event.target.parentElement
            const id = parentElement.id.replace('carrito', '')
            const index = carrito.findIndex(producto => producto.id == id)
            if (index !== -1) {
                carrito.splice(index, 1)
                localStorage.setItem("carrito", JSON.stringify(carrito))
                actualizarVistaCarrito()
                Swal.fire("Producto eliminado del carrito!")
            }
        }
    })
}


const principal = async () => {
    const productos = await traerProductos()
    agregarProductoCarrito(productos)
    actualizarVistaCarrito()
    eliminarProductoCarrito()
}

principal()