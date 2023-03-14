const dateReference = data.currentDate;
const pastContenedor = document.getElementById("pastContenedor");

function showCategories(categories) {

    for (let i = 0; i < data.events.length; i++) {

        let eventPast = data.events[i];
        let dateEvents = eventPast.date;

        if (new Date(dateEvents) < new Date(dateReference)) {

            let pastTarjeta = crearTarjeta(eventPast);
            pastContenedor.appendChild(pastTarjeta);
        }
    }
}