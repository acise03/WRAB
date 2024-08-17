function addRoute() {
    // Get user input
    const startCoord = document.getElementById('startCoord').value.split(',').map(Number);
    const endCoord = document.getElementById('endCoord').value.split(',').map(Number);
    
    // Create GeoJSON for the new route
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
    
    // Add the new route to the map
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
    
    // Optionally, save the route data for later use
    // localStorage.setItem('userRoute', JSON.stringify(newRouteGeoJson));
}