function crearTarjeta(evento) {

    //Este es el contenedor de la tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.setAttribute("class", "tarjeta")

    //Este es la imagen de la tarjeta
    const tarjetaImg = document.createElement("div");
    tarjetaImg.setAttribute("class", "tarjetaImg");
    const imagen = document.createElement("img");
    imagen.setAttribute("alt", "img");
    // imagen.setAttribute("src", "image");
    imagen.setAttribute("scr", evento.image);
    tarjetaImg.appendChild(imagen);

    //Esta es la descripción de la tarjeta
    const tarjetaDescripcion = document.createElement("div");
    tarjetaDescripcion.setAttribute("class", "tarjetaDescripcion");

    const h3 = document.createElement("h3");
    h3.innerHTML = evento.name;
    tarjetaDescripcion.appendChild(h3);

    const descripcion = document.createElement("p");
    descripcion.innerHTML = evento.description;
    tarjetaDescripcion.appendChild(descripcion);

    //Este es el botón de la tarjeta
    const tarjetaBoton = document.createElement("div");
    tarjetaBoton.setAttribute("class", "tarjetaBoton");
    const precio = document.createElement("h4")
    precio.innerHTML = evento.price;
    tarjetaBoton.appendChild(precio)

    const botonMas = document.createElement("a");
    botonMas.setAttribute("class", "buttonMas");
    botonMas.setAttribute("href", "information.html");
    botonMas.innerHTML = "Ver más";
    tarjetaBoton.appendChild(botonMas);

    tarjeta.appendChild(tarjetaImg);
    tarjeta.appendChild(tarjetaDescripcion);
    tarjeta.appendChild(tarjetaBoton);

    return tarjeta;
}

// // function crearTarjeta(evento) {
// //     if (evento.length == 0) {
        
// //         console.log("entre");
// //         contenedor.innerHTML = "<p>No se encontran resultados<p/>"
        
// //         return
// //     }
// //     let ficha = ""
// //     evento.forEach(event => {
// //         ficha += `
// //             <div class="tarjeta">
// //                 <div class="tarjetaImg">
// //                 <img src="${event.image}" class="card-img rounded-top " alt="${event.category}">
// //                 <div class="tarjetaDescripcion">
// //                     <h3>${event.name}</h3>
// //                     <p>${event.description}</p>
// //                     <h4>${event.price}</h4>
// //                         <a class="buttonMas" href="information.html">
// //                             Ver más
// //                         </a>
// //                 </div>
// //                 </div>
// //             </div>`
// //     })
// //     contenedor.innerHTML = ficha;
// // }