function addRoute() {
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
            }
        ]
    };
    
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