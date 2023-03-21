// const dateReference = data.currentDate;
// const pastContenedor = document.getElementById("pastContenedor");
// const categorieContenedor = document.getElementById('categorias');

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
//             pastContenedor.appendChild(pastTarjeta);
//         }
//     }

// }

// // function removeAllChildNodes(parent) {
// //     while (parent.firstChild) {
// //         parent.removeChild(parent.firstChild);
// //     }
// // }

// // const categoriesNoDuplicados = categories.filter((item, index) => {
// //     return categories.indexOf(item) === index;
// // });

// // showCategories(categoriesNoDuplicados);
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

            console.log(respuesta);

            const dateReference = respuesta.currentDate;
            const pastContenedor = document.getElementById("pastContenedor");
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

            function showList(listado) {

                for (let i = 0; i < listado.length; i++) {

                    let eventPast = respuesta.events[i];
                    let dateEvents = eventPast.date;

                    if (new Date(dateEvents) < new Date(dateReference)) {

                        let pastTarjeta = crearTarjeta(eventPast);
                        pastContenedor.appendChild(pastTarjeta);
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

            const botonBusqueda = document.getElementById('botonBusqueda');

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