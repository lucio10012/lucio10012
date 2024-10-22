google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Cargar datos de Firebase
    fetch('https://proyectocompostera-fed11-default-rtdb.firebaseio.com/.json')
        .then(response => response.json())
        .then(data => {
            // Extraer los datos de clima y compostaje
            const temperaturaClima = data.datos_clima.temperatura || 0;
            const humedadClima = data.datos_clima.humedad || 0;

            // Crear la tabla de datos para Google Charts
            const dataTable = google.visualization.arrayToDataTable([
                ['', 'Value'],
                ['', temperaturaClima],
            ]);

            const options = {
                width: 400, height: 200,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };

            const chart = new google.visualization.Gauge(document.getElementById('chart_div'));
            chart.draw(dataTable, options);

            // Actualizar el gráfico cada 5 minutos
            setInterval(() => {
                fetch('https://proyectocompostera-fed11-default-rtdb.firebaseio.com/.json')
                    .then(response => response.json())
                    .then(data => {
                        const temperaturaClima = data.datos_clima.temperatura || 0;
                        const humedadClima = data.datos_clima.humedad || 0;

                        dataTable.setValue(0, 1, temperaturaClima);
                        dataTable.setValue(1, 1, humedadClima);
                        chart.draw(dataTable, options);
                    });
            }, 300000); // 300000 ms = 5 minutos
        })
        .catch(error => {
            console.error('Error al cargar los datos de Firebase:', error);
        });
}
