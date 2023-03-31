// const dateReference = data.currentDate;
// const contenedor = document.getElementById("upcommingCategoryContenedor");

// for (let i = 0; i < data.events.length; i++) {

//     let eventComming = data.events[i];
//     let dateEvents = eventComming.date;

//     if(new Date(dateEvents) > new Date(dateReference)){

//         let commingTarjeta = crearTarjeta(eventComming);
//         upcommingCategoryContenedor.appendChild(commingTarjeta);
//     }  
// }

let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            const dateReference = respuesta.currentDate;
            const contenedor = document.getElementById("contenedorTarjeta");
            const upcommingCategoryContenedor = document.getElementById('upcommingCategoryContenedor');
            const upcommingEvents = respuesta.events.filter((evento) => new Date(evento.date) > new Date(dateReference));

            const categories = upcommingEvents.map((evento) => evento.category);
            let categorieSelecteds = [];

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

                    upcommingCategoryContenedor.appendChild(input);
                    upcommingCategoryContenedor.appendChild(label);
                }
            }

            function showList(listado) {
                for (let i = 0; i < listado.length; i++) {

                    let eventComming = listado[i];

                    let commingTarjeta = crearTarjeta(eventComming);
                    contenedor.appendChild(commingTarjeta);
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
            showList(upcommingEvents);

            const botonBusqueda = document.getElementById('botonBusqueda');

            botonBusqueda
                .addEventListener('click', () => {
                    const inputBusqueda = document.getElementById('inputBusqueda');
                    const textoBusqueda = inputBusqueda.value;
                    if (textoBusqueda.length) {
                        const busqueda = textoBusqueda.toLowerCase();

                        const listadoFiltrado = upcommingEvents.filter((evento) => evento.name.toLowerCase().includes(busqueda));

                        removeAllChildNodes(contenedor);
                        showList(listadoFiltrado);
                    } else {
                        removeAllChildNodes(contenedor);
                        showList(upcommingEvents);
                    }
                });

            upcommingCategoryContenedor
                .addEventListener('click', (event) => {
                    const label = document.getElementsByClassName(event.target.id)[0];
                    const category = label.textContent;
                    const categoryToSearh = category.toLowerCase();

                    if (event.target.checked) {
                        const hasClass = event.target.classList.contains('buscarCategoria');
                        if (hasClass) {
                            if (category.length) {
                                categorieSelecteds.push(categoryToSearh);

                                const listadoFiltrado = upcommingEvents.filter((evento) => categorieSelecteds.includes(evento.category.toLowerCase()));

                                removeAllChildNodes(contenedor);
                                showList(listadoFiltrado);
                            } else {
                                removeAllChildNodes(contenedor);
                                showList(upcommingEvents);
                            }
                        }
                    } else {
                        let listado = upcommingEvents;
                        const hasCategory = categorieSelecteds.find((category) => category === categoryToSearh)

                        if (hasCategory) {
                            categorieSelecteds = categorieSelecteds.filter((category) => category !== categoryToSearh);
                        }

                        if (categorieSelecteds.length > 0) {
                            listado = upcommingEvents.filter((evento) => categorieSelecteds.includes(evento.category.toLowerCase()));
                        }

                        removeAllChildNodes(contenedor);
                        showList(listado);
                    }
                });
        })
        .catch((error) => console.log(error));
