
let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            console.log(respuesta);

            var baseUrl = (window.location).href;
            console.log(baseUrl);

            var id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
            console.log(id);

            const evento = respuesta.events.filter((x) => x._id == id)[0];

            console.log(evento);

            const titulo = document.getElementById('titulo');
            titulo.innerText = evento.name;

            const textoDescriptivo = document.getElementById('texto_descriptivo');
            textoDescriptivo.innerText = evento.description;


            const image = document.getElementById('image');
            image.setAttribute('src', evento.image);
            image.setAttribute("class", "tarjeta");
            image.setAttribute("class", "tarjetaImg");

            const price = document.getElementById('price');
            price.innerText = evento.price;
            price.innerHTML = `${evento.price}$`;


        })
        .catch((error) => console.log(error));