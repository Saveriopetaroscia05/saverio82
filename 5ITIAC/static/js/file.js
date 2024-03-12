navigator.geolocation.getCurrentPosition(
    function(event) {
        createMap(event.coords.latitude, event.coords.longitude)
    },
    function(event) {
        createMap(81.76105839473563, -795.5419921875001)
    }
);

function createMap(lat, lng) {
    const map = L.map('map').setView([lat, lng], 13);


    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const marker = L.marker([lat, lng]).addTo(map);

    function onMapClick(e) {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        // Imposta la latitudine nel campo di input "lat"
        const latInput = document.getElementById("lat");
        latInput.value = latitude;

        // Imposta la longitudine nel campo di input "lng"
        const lngInput = document.getElementById("lng");
        lngInput.value = longitude;

        const popup = L.popup()
            .setLatLng(e.latlng)
            .setContent(`You clicked the map at ${e.latlng.toString()}`)
            .openOn(map);
    }

    map.on('click', onMapClick);
};



document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault()
    let latitudine = document.querySelector("#lat").value
    let longitudine = document.querySelector("#lng").value

    console.log(latitudine, longitudine)

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitudine}&longitude=${longitudine}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m`


    fetch(url).then(function(resp) {
        return resp.json()
    }).then(function(data) {
        console.log(data.hourly.time)
        console.log(data.hourly.temperature_2m)
        console.log(data.hourly.relativehumidity_2m)
            // Array di indici delle date specifiche da visualizzare
        const specificDateIndices = [1, 7, 33, 44, 55, 69, 99, 104, 167, ];

        // Estrai le date corrispondenti agli indici specifici
        const specificDates = specificDateIndices.map(index => data.hourly.time[index]);

        // Estrai le temperature corrispondenti agli indici specifici
        const specificTemperatures = specificDateIndices.map(index => data.hourly.temperature_2m[index]);
        const specificHumidity = specificDateIndices.map(index => data.hourly.relativehumidity_2m[index]);

        // Aggiorna il grafico con le date specifiche e le temperature corrispondenti
        updateChart(myChart, specificDates, specificTemperatures, specificHumidity);
    })
});

function updateChart(chart, labels, temperatureData, humidityData) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = temperatureData;
    chart.data.datasets[1].data = humidityData;
    chart.update();
}
let canvas = document.querySelector("canvas")

let config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
                label: 'Temperatura media',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                yAxisID: 'y',
            },
            {
                label: 'Umidità media',
                data: [],
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
                tension: 0.1,
                yAxisID: 'y1',
            }
        ]
    },
    scales: {
        y: {
            type: 'linear',
            position: 'left',
        },
        y1: {
            type: 'linear',
            position: 'left'
        }
    }
}
const myChart = new Chart(canvas, config)