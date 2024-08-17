let imageUrl = '';
let map;
let marker;
function toggleMode() {
    alert(`Drag the logo`);
}
function saved(){
    alert("The marker has been saved.");
}

document.addEventListener('DOMContentLoaded', function () {
     map = tt.map({
        key: "iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB",
        container: "exploreMap",
        center: [-79.43898010253906, 43.903018951416016],
        zoom: 14
    });

});

const marker_data = [];


function saveLocation() {
    if (marker) {
        const lngLat = marker.getLngLat();
        var dd = document.getElementById("markerDropdown");
        var selected = dd.value;


        marker_data.push({
            lat: lngLat.lat,
            lng: lngLat.lng,
            type: selected
        })
        saved();
    }
}

function addMarker() {
    toggleMode();
    if (marker) {
        marker.remove();
    }

    marker = new tt.Marker({
        element: createMarkerElement(document.getElementById('markerDropdown').value)
    })
        .setLngLat(map.getCenter())
        .addTo(map)
        .setDraggable(true);

}


document.getElementById('markerDropdown').addEventListener('change', function (event) {
    imageUrl = event.target.value;

    if (marker) {
        marker.remove();
    }
    marker = new tt.Marker({
        element: createMarkerElement(imageUrl)
    })
        .setLngLat(marker ? marker.getLngLat() : [-79.43898010253906, 43.903018951416016])
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




function showMarkers() {
    marker_data.forEach(markerr => {
        new tt.Marker({
            element: createMarkerElement(markerr.type)
        })
            .setLngLat([markerr.lng, markerr.lat])
            .addTo(map)
    })
}
