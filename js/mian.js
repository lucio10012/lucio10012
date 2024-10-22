
fetch('https://proyectocompostera-fed11-default-rtdb.firebaseio.com/.json')
    .then(response => response.json())
    .then(data => {
        const temperaturaClima = data.datos_clima.temperatura || 0;
        const humedadClima = data.datos_clima.humedad || 0;

        document.body.innerHTML += `<p>Temperatura: ${temperaturaClima}°C</p>`;
        document.body.innerHTML += `<p>Humedad: ${humedadClima}%</p>`;
    })
    .catch(error => {
        console.error('Error al cargar los datos de Firebase:', error);
    });

