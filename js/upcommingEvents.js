const dateReference = data.currentDate;
const commingContenedor = document.getElementById("commingContenedor");

for (let i = 0; i < data.events.length; i++) {

    let eventComming = data.events[i];
    let dateEvents = eventComming.date;

    if(new Date(dateEvents) > new Date(dateReference)){
        
        let commingTarjeta = crearTarjeta(eventComming);
        commingContenedor.appendChild(commingTarjeta);
    }  
}