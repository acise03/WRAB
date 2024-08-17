var mode = null;
const API_KEY = 'iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB';
const EARTH_R = 6378.137;

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

function getEnd(start, dist) {
    const half = 0.4 * dist;
    const theta = 2 * Math.PI * Math.random();

    const s_longitutde = start[0] * Math.PI / 180;
    const s_latitutde = start[1] * Math.PI / 180;

    const e_latitutde = (Math.asin(Math.sin(s_latitutde) * Math.cos(half / EARTH_R) + Math.cos(s_latitutde) * Math.cos(theta) * Math.sin(half / EARTH_R))) * 180 / Math.PI;
    const e_longitutde = (s_longitutde + Math.atan2(Math.cos(s_latitutde) * Math.sin(theta) * Math.sin(half / EARTH_R), Math.cos(half / EARTH_R) - Math.sin(s_latitutde) * Math.sin(e_latitutde))) * 180 / Math.PI;

    end = [e_longitutde, e_latitutde];

    return end;
}

async function generateRoute() {
    const routeName = document.getElementById('routeName').value;
    const distance = document.getElementById('distance').value;
    const startCoord = document.getElementById('startCoord').value.split(',').map(Number);
    const endCoord = getEnd(startCoord, distance);


    var response = await tt.services.calculateRoute({
        key: API_KEY,
        locations: `${startCoord.join(',')}:${endCoord.join(',')}:${startCoord.join(',')}`,
        avoid: "alreadyUsedRoads",
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
