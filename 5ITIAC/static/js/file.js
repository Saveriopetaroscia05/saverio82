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
    })
});