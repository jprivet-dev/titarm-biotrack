console.log("initialisation de la carte");

try {
    console.log("try");
    document.getElementById('map-placeholder').style.display = 'none';
    document.getElementById('map').style.display = 'block';

    const map = L.map('map').setView([46.603354, 1.888334], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
    }).addTo(map);
} catch (e) {
    document.getElementById('map-placeholder').style.display = 'flex';
    document.getElementById('map').style.display = 'none';
    console.error("error dinitialisation de la carte ", e);
}
