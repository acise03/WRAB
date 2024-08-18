API_KEY = "iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB";

var mode = null;

function toggleMode(button) {
    mode = button;
    let toastBox = document.getElementById('toastBox');
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = '<i class="fa-solid fa-arrow-pointer"></i> Click on the map!';
    toastBox.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

map.on('click', (event) => {
    if (mode) {
        const coords = [event.lngLat.lng, event.lngLat.lat];
        document.getElementById(mode + 'Coord').value = coords.join(', ');
        mode = null;
    }
});

document.getElementById('startCoordButton').addEventListener('click', (event) => { event.preventDefault(); toggleMode('start') });
document.getElementById('endCoordButton').addEventListener('click', (event) => { event.preventDefault(); toggleMode('end') });


async function addRoute() {
    const startCoord = document.getElementById('startCoord').value.split(',').map(Number);
    const endCoord = document.getElementById('endCoord').value.split(',').map(Number);

    var response = await tt.services.calculateRoute({
        key: API_KEY,
        locations: `${startCoord.join(',')}:${endCoord.join(',')}`,
    });

    var newRouteGeoJson = response.toGeoJson();

    if (map.getLayer("route"))
        map.removeLayer("route");
    if (map.getSource("route"))
        map.removeSource("route");

    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            data: newRouteGeoJson,
        },
        paint: {
            "line-color": "#0000FF",
            "line-width": 5,
        },
    })

    const distanceText = document.getElementById("routeDistance");
    distanceText.textContent = newRouteGeoJson.features[0].properties.summary.lengthInMeters / 1000.0;

    var bound = new tt.LngLatBounds();
    bound.extend(tt.LngLat.convert(startCoord));
    bound.extend(tt.LngLat.convert(endCoord));
    map.fitBounds(bound, { padding: 20 });
}
