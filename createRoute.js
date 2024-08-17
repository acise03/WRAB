var mode = null;
const API_KEY = 'iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB';

function toggleMode(button) {
    mode = button;
    alert(`Choose ${button} on map.`);
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
    const routeName = document.getElementById('routeName').value;
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
}
