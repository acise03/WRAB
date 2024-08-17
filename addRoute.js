let mode = null;

function toggleMode(button) {
    mode = button;
    alert(`Choose ${button} on map.`);
}

map.on('click', (event) => {
    if (mode) {
        const coords = [event.lngLat.lng, event.lngLat.lat];
        document.getElementById(mode+'Coord').value = coords.join(', ');
        mode = null;
    }
});

document.getElementById('startCoordButton').addEventListener('click', (event) => {event.preventDefault(); toggleMode('start')});
document.getElementById('endCoordButton').addEventListener('click', (event) => {event.preventDefault(); toggleMode('end')});

function addRoute() {
    const routeName = document.getElementById('routeName').value;
    const startCoord = document.getElementById('startCoord').value.split(',').map(Number);
    const endCoord = document.getElementById('endCoord').value.split(',').map(Number);
    
    const newRouteGeoJson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        startCoord,
                        endCoord
                    ]
                },
                "properties": {
                    "name": routeName
                }
            }
        ]
    };
    
    if (map.getSource('userRoute')) {
        map.getSource('userRoute').setData(newRouteGeoJson);
    }
    else {
        map.addLayer({
            id: 'userRoute',
            type: 'line',
            source: {
                type: 'geojson',
                data: newRouteGeoJson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#0000FF',
                'line-width': 5
            }
        });
    }
}
