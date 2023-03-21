// const dateReference = data.currentDate;
// const commingContenedor = document.getElementById("commingContenedor");

// for (let i = 0; i < data.events.length; i++) {

//     let eventComming = data.events[i];
//     let dateEvents = eventComming.date;

//     if(new Date(dateEvents) > new Date(dateReference)){

//         let commingTarjeta = crearTarjeta(eventComming);
//         commingContenedor.appendChild(commingTarjeta);
//     }  
// }

let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            // console.log(respuesta);

            const dateReference = data.currentDate;
            const commingContenedor = document.getElementById("commingContenedor");

            const categorieContenedor = document.getElementById('categorias');

            const categories = data.events.map((evento) => evento.category);

            function showCategories(categories) {
                for (let i = 0; i < categories.length; i++) {

                    const input = document.createElement("input");
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("name", "category");
                    input.setAttribute("id", `category${i}`);
                    input.setAttribute("class", "buscarCategoria");

                    const label = document.createElement("label");
                    label.setAttribute("for", "checkbox");
                    input.setAttribute("class", `category${i}`);
                    input.setAttribute("class", "buscarCategoria");

                    label.innerText = categories[i];

                    categorieContenedor.appendChild(input);
                    categorieContenedor.appendChild(label);
                }
            }

            for (let i = 0; i < data.events.length; i++) {

                let eventComming = data.events[i];
                let dateEvents = eventComming.date;

                if (new Date(dateEvents) > new Date(dateReference)) {

                    let commingTarjeta = crearTarjeta(eventComming);
                    commingContenedor.appendChild(commingTarjeta);
                }
            }

            function showList(listado) {

                for (let i = 0; i < data.length; i++) {

                    let eventComming = data.events[i];
                    let dateEvents = eventComming.date;

                    if (new Date(dateEvents) > new Date(dateReference)) {

                        let commingTarjeta = crearTarjeta(eventComming);
                        commingContenedor.appendChild(commingTarjeta);
                    }
                }

            }

            function removeAllChildNodes(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }

            const categoriesNoDuplicados = categories.filter((item, index) => {
                return categories.indexOf(item) === index;
            });

            showCategories(categoriesNoDuplicados);
            showList(data.events);

            const botonBusqueda = document.getElementById('botonBuscar');

            botonBusqueda
                .addEventListener('click', () => {
                    const inputBusqueda = document.getElementById('busqueda');
                    const textoBusqueda = inputBusqueda.value;
                    if (textoBusqueda.length) {
                        const busqueda = textoBusqueda.toLowerCase();

                        const listadoFiltrado = data.events.filter((evento) => evento.name.toLowerCase().includes(busqueda));

                        removeAllChildNodes(contenedor);
                        showList(listadoFiltrado);
                    } else {
                        removeAllChildNodes(contenedor);
                        showList(data.events);
                    }
                })

            document
                .addEventListener('click', (event) => {
                    const hasClass = event.target.classList.contains('buscarCategoria');
                    if (hasClass) {
                        const label = document.querySelector("label", event.target.id);
                        const category = label.textContent;
                        if (category.length) {
                            const categoryToSearh = category.toLowerCase();

                            const listadoFiltrado = data.events.filter((evento) => evento.category.toLowerCase().includes(categoryToSearh));

                            removeAllChildNodes(contenedor);
                            showList(listadoFiltrado);
                        } else {
                            removeAllChildNodes(contenedor);
                            showList(data.events);
                        }
                    }
                })
        })
        .catch((error) => console.log(error));
