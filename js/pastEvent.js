// const dateReference = data.currentDate;
// const contenedor = document.getElementById("pastContenedor");
// const categorieContenedor = document.getElementById('pastCategoryContenedor');

// const categories = data.events.map((evento) => evento.category);


// function showCategories(categories) {
//     for (let i = 0; i < categories.length; i++) {

//         const input = document.createElement("input");
//         input.setAttribute("type", "checkbox");
//         input.setAttribute("name", "category");
//         input.setAttribute("id", `category${i}`);
//         input.setAttribute("class", "buscarCategoria");

//         const label = document.createElement("label");
//         label.setAttribute("for", "checkbox");
//         input.setAttribute("class", `category${i}`);
//         input.setAttribute("class", "buscarCategoria");

//         label.innerText = categories[i];

//         categorieContenedor.appendChild(input);
//         categorieContenedor.appendChild(label);
//     }
// }

// function showList(listado) {

//     for (let i = 0; i < listado.length; i++) {

//         let eventPast = data.events[i];
//         let dateEvents = eventPast.date;

//         if (new Date(dateEvents) < new Date(dateReference)) {

//             let pastTarjeta = crearTarjeta(eventPast);
//             contenedor.appendChild(pastTarjeta);
//         }
//     }

// }

// function removeAllChildNodes(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }

// const categoriesNoDuplicados = categories.filter((item, index) => {
//     return categories.indexOf(item) === index;
// });

// showCategories(categoriesNoDuplicados);
// showList(data.events);

// const botonBusqueda = document.getElementById('botonBusqueda');

// botonBusqueda
//     .addEventListener('click', () => {
//         const inputBusqueda = document.getElementById('busqueda');
//         const textoBusqueda = inputBusqueda.value;
//         if (textoBusqueda.length) {
//             const busqueda = textoBusqueda.toLowerCase();

//             const listadoFiltrado = data.events.filter((evento) => evento.name.toLowerCase().includes(busqueda));

//             removeAllChildNodes(contenedor);
//             showList(listadoFiltrado);
//         } else {
//             removeAllChildNodes(contenedor);
//             showList(data.events);
//         }
//     })

// document
//     .addEventListener('click', (event) => {
//         const hasClass = event.target.classList.contains('buscarCategoria');
//         if (hasClass) {
//             const label = document.querySelector("label", event.target.id);
//             const category = label.textContent;
//             if (category.length) {
//                 const categoryToSearh = category.toLowerCase();

//                 const listadoFiltrado = data.events.filter((evento) => evento.category.toLowerCase().includes(categoryToSearh));

//                 removeAllChildNodes(contenedor);
//                 showList(listadoFiltrado);
//             } else {
//                 removeAllChildNodes(contenedor);
//                 showList(data.events);
//             }
//         }
//     })

let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            const dateReference = respuesta.currentDate;
            const contenedor = document.getElementById("contenedorTarjeta");
            const pastCategoryContenedor = document.getElementById('pastCategoryContenedor');
            const pastEvents = respuesta.events.filter((evento) => new Date(evento.date) < new Date(dateReference));

            const categories = pastEvents.map((evento) => evento.category);
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

                    pastCategoryContenedor.appendChild(input);
                    pastCategoryContenedor.appendChild(label);
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
            showList(pastEvents);

            const botonBusqueda = document.getElementById('botonBusqueda');

            botonBusqueda
                .addEventListener('click', () => {

                    const inputBusqueda = document.getElementById('inputBusqueda');
                    const textoBusqueda = inputBusqueda.value;
                    if (textoBusqueda.length) {
                        const busqueda = textoBusqueda.toLowerCase();

                        const listadoFiltrado = pastEvents.filter((evento) => evento.name.toLowerCase().includes(busqueda));

                        removeAllChildNodes(contenedor);
                        showList(listadoFiltrado);
                    } else {
                        removeAllChildNodes(contenedor);
                        showList(pastEvents);
                    }
                });


            pastCategoryContenedor
                .addEventListener('click', (event) => {
                    const label = document.getElementsByClassName(event.target.id)[0];
                    const category = label.textContent;
                    const categoryToSearh = category.toLowerCase();

                    if (event.target.checked) {
                        const hasClass = event.target.classList.contains('buscarCategoria');
                        if (hasClass) {
                            if (category.length) {
                                categorieSelecteds.push(categoryToSearh);

                                const listadoFiltrado = pastEvents.filter((evento) => categorieSelecteds.includes(evento.category.toLowerCase()));

                                removeAllChildNodes(contenedor);
                                showList(listadoFiltrado);
                            } else {
                                removeAllChildNodes(contenedor);
                                showList(pastEvents);
                            }
                        }
                    } else {
                        let listado = pastEvents;
                        const hasCategory = categorieSelecteds.find((category) => category === categoryToSearh)

                        if (hasCategory) {
                            categorieSelecteds = categorieSelecteds.filter((category) => category !== categoryToSearh);
                        }

                        if (categorieSelecteds.length > 0) {
                            listado = pastEvents.filter((evento) => categorieSelecteds.includes(evento.category.toLowerCase()));
                        }

                        removeAllChildNodes(contenedor);
                        showList(listado);
                    }
                });
        })
        .catch((error) => console.log(error));