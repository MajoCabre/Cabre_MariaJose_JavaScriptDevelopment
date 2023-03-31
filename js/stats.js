function getPercentageOfAttendance(capacity, assistance) {
    return (assistance * 100) / capacity;
}

function getEventWithLargerCapacity(events) {
    let capacity = 0;
    let evento;
    events.forEach(event => {
        if (capacity < event.capacity) {
            capacity = event.capacity;
            evento = event;
        }
    });

    return {
        event: evento.name,
        capacity: capacity
    };
}

function getEventsWithTheLowestPercentageOfAttendance(events) {
    let response = 100;
    let evento;
    events.forEach(event => {
        const percentaje = getPercentageOfAttendance(event.capacity, event.assistance);
        if (response > percentaje) {
            response = percentaje;
            evento = event;
        }
    });

    return {
        event: evento.name,
        response: response
    };
}

function getEventsWithTheHighestPercentageOfAttendance(events) {
    let response = 0;
    let evento;
    events.forEach(event => {
        const percentaje = getPercentageOfAttendance(event.capacity, event.assistance);
        if (response < percentaje) {
            response = percentaje;
            evento = event;
        }
    });

    return {
        event: evento.name,
        response: response
    };
}

let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            console.log('stats', respuesta);
            const dateReference = respuesta.currentDate;
            const allEvents = respuesta.events;
            const upcommingEvents = respuesta.events.filter((evento) => new Date(evento.date) > new Date(dateReference));
            const pastEvents = respuesta.events.filter((evento) => new Date(evento.date) < new Date(dateReference));

            const upcommingEventsCategories = upcommingEvents.map((evento) => evento.category);
            const pastEventsCategories = pastEvents.map((evento) => evento.category);

            const upcommingEventsCategoriesNoDuplicados = upcommingEventsCategories.filter((item, index) => {
                return upcommingEventsCategories.indexOf(item) === index;
            });

            const pastEventsCategoriesNoDuplicados = pastEventsCategories.filter((item, index) => {
                return pastEventsCategories.indexOf(item) === index;
            });

            console.log('upcommingEventsCategoriesNoDuplicados', upcommingEventsCategoriesNoDuplicados);

            console.log('pastEventsCategoriesNoDuplicados', pastEventsCategoriesNoDuplicados);

            console.log('getEventWithLargerCapacity', getEventWithLargerCapacity(allEvents));
            console.log('getEventsWithTheLowestPercentageOfAttendance', getEventsWithTheLowestPercentageOfAttendance(allEvents));
            console.log('getEventsWithTheHighestPercentageOfAttendance', getEventsWithTheHighestPercentageOfAttendance(allEvents));

            const highestPercentage = document.getElementById('highestPercentage');
            const lowestPercentage = document.getElementById('lowestPercentage');
            const largerCapacity = document.getElementById('largerCapacity');

            const eventCapacity = getEventWithLargerCapacity(allEvents);
            const eventlowestPercentage = getEventsWithTheLowestPercentageOfAttendance(allEvents);
            const eventhighestPercentage = getEventsWithTheHighestPercentageOfAttendance(allEvents);

            highestPercentage.innerHTML = `<div>${eventhighestPercentage.event}  ${eventhighestPercentage.response}%</div>`;
            lowestPercentage.innerHTML = `<div>${eventlowestPercentage.event}  ${eventlowestPercentage.response}%</div>`;
            largerCapacity.innerHTML = `<div>${eventCapacity.event}  ${eventCapacity.capacity}</div>`;


            const categoryUpcomming = document.getElementById('upcommingEventsCategoriesNoDuplicados');

            const categoryPast = document.getElementById('pastEventsCategoriesNoDuplicados');

            upcommingEventsCategoriesNoDuplicados
                .forEach((category) => {
                    const tr = document.createElement("tr");

                    const td1 = document.createElement("td");

                    td1.innerText = category;

                    tr.appendChild(td1);
                    categoryUpcomming.appendChild(tr);
                });

            pastEventsCategoriesNoDuplicados
                .forEach((category) => {
                    const tr = document.createElement("tr");

                    const td1 = document.createElement("td");

                    td1.innerText = category;

                    tr.appendChild(td1);
                    categoryPast.appendChild(tr);
                });

        })
        .catch((error) => console.log(error));
