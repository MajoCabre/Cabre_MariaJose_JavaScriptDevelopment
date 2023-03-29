// const dateReference = data.currentDate;
// const contenedor = document.getElementById("contenedor");

// for (let i = 0; i < data.events.length; i++) {

//     let eventComming = data.events[i];
//     let dateEvents = eventComming.date;

//     if(new Date(dateEvents) > new Date(dateReference)){

//         let commingTarjeta = crearTarjeta(eventComming);
//         contenedor.appendChild(commingTarjeta);
//     }  
// }

let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            // console.log(respuesta);

            const dateReference = data.currentDate;
            const contenedor = document.getElementById("contenedorTarjeta");
            const categorieContenedor = document.getElementById('categoryContenedor');
            const categories = respuesta.events.map((evento) => evento.category);

            function showCategories(categories) {
                for (let i = 0; i < categories.length; i++) {

                    const input = document.createElement("input");
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("name", "category");
                    input.setAttribute("id", `category${i}`);
                    input.setAttribute("class", "buscarCategoria");

                    const label = document.createElement("label");
                    label.setAttribute("for", "checkbox");
                    label.setAttribute("class", `category${i}`);

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
                    contenedor.appendChild(commingTarjeta);
                }
            }

            function showList(listado) {
                for (let i = 0; i < listado.length; i++) {

                    let eventComming = data.events[i];
                    let dateEvents = eventComming.date;
    
                    if (new Date(dateEvents) > new Date(dateReference)) {
    
                        let commingTarjeta = crearTarjeta(eventComming);
                        contenedor.appendChild(commingTarjeta);
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
            showList(respuesta.events);

            const botonBusqueda = document.getElementById('botonBusqueda');

            botonBusqueda
                .addEventListener('click', () => {
                    console.log('CLICK 1 queremos input');

                    const inputBusqueda = document.getElementById('inputBusqueda');
                    const textoBusqueda = inputBusqueda.value;
                    if (textoBusqueda.length) {
                        const busqueda = textoBusqueda.toLowerCase();

                        const listadoFiltrado = respuesta.events.filter((evento) => evento.name.toLowerCase().includes(busqueda));

                        removeAllChildNodes(contenedor);
                        showList(listadoFiltrado);
                    } else {
                        removeAllChildNodes(contenedor);
                        showList(respuesta.events);
                    }
                });

            const categoryContenedor = document.getElementById('categoryContenedor');

            categoryContenedor
                .addEventListener('click', (event) => {
                    console.log('CLICK 2 queremos checkbox');
                    if (event.target.checked) {
                        const hasClass = event.target.classList.contains('buscarCategoria');
                        if (hasClass) {
                            console.log('id', event.target.id)

                            const label = document.getElementsByClassName(event.target.id)[0];
                            console.log('label', label)

                            const category = label.textContent;
                            console.log('category', category)

                            if (category.length) {
                                const categoryToSearh = category.toLowerCase();
                                console.log('categoryToSearh', categoryToSearh)

                                const listadoFiltrado = respuesta.events.filter((evento) => evento.category.toLowerCase().includes(categoryToSearh));

                                removeAllChildNodes(contenedor);
                                showList(listadoFiltrado);
                            } else {
                                removeAllChildNodes(contenedor);
                                showList(respuesta.events);
                            }
                        }
                    } else {
                        removeAllChildNodes(contenedor);
                        showList(respuesta.events);
                    }
                });
        })
        .catch((error) => console.log(error));
