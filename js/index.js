const contenedor = document.getElementById("contenedorTarjeta");
console.log(contenedor);

for (let i = 0; i < data.events.length; i++) {

    let evento = data.events[i];

    let tarjetaPrincipal = crearTarjeta(evento);

    contenedor.appendChild(tarjetaPrincipal);
}