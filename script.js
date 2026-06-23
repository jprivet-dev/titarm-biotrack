console.log("initialisation de la carte");

try {
    console.log("try");
    document.getElementById('map-placeholder').style.display = 'none';
    document.getElementById('map').style.display = 'block';

    const map = L.map('map').setView([20, -30], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
    }).addTo(map);

    // Chargement du JSON
    fetch("sharks-2019.json")
        .then(res => res.json())
        .then(data => {
            data.individuals.forEach(shark => {
                if (!shark.locations || shark.locations.length === 0) return;

                // Dernière position connue
                const last = shark.locations[shark.locations.length - 1];
                const lat = last.lat;
                const lng = last.lng;

                const weight  = shark.weight  != null ? shark.weight  + " kg" : "N/A";
                const length  = shark.length  != null ? shark.length  + " cm" : "N/A";

                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(`
                        <strong>${shark.name}</strong><br>
                        🦈 ${shark.species}<br>
                        ${shark.gender}<br>
                        ⚖️ ${weight} &nbsp;|&nbsp; 📏 ${length}<br>
                        📅 ${last.timestamp}
                    `);
            });
        })
        .catch(err => console.error("Erreur chargement JSON :", err));

} catch (e) {
    document.getElementById('map-placeholder').style.display = 'flex';
    document.getElementById('map').style.display = 'none';
    console.error("error dinitialisation de la carte ", e);
}
