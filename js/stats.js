let datos =
    fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then((respuesta) => respuesta.json())
        .then((respuesta) => {
            console.log('stats', respuesta)
        })
        .catch((error) => console.log(error));
