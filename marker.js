var marker = new tt.Marker();
function toggleMode(button) {
    alert(`Drag the logo`);
}




function addMarker() {
    toggleMode();
    if (marker) {
        marker.remove();
    }

    marker = new tt.Marker({
        element: createMarkerElement(document.getElementById('markerDropdown').value)
    })
        .setLngLat([-79.43898010253906, 43.903018951416016])
        .addTo(map)
        .setDraggable(true);

}


document.getElementById('markerDropdown').addEventListener('change', function (event) {
    const imageUrl = event.target.value;

    if (marker) {
        marker.remove();
    }
    marker = new tt.Marker({
        element: createMarkerElement(imageUrl)
    })
        .setLngLat(marker ? marker.getLngLat : [-79.43898010253906, 43.903018951416016])
        .addTo(map);
});

function createMarkerElement(imageUrl) {
    const div = document.createElement('div');
    div.style.backgroundImage = `url(${imageUrl})`;
    div.style.backgroundSize = 'contain';
    div.style.width = '32px';
    div.style.height = '32px';
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundPosition = 'center';
    return div;
}

document.addEventListener('DOMContentLoaded', function () {
    map = tt.map({
        key: "iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB",
        container: "map",
        center: [-79.43898010253906, 43.903018951416016],
        zoom: 14
    });
});
