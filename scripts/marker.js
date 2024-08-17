let imageUrl = '';
let map;
let marker;
let showOrHide = false;
let deleatble = false;
let shownMarkers = [];
function toggleMode() {
    alert(`Drag the logo`);
}
function saved() {
    alert("The marker has been saved.");
}
function del() {
    if (deleatble) {
        marker.remove();
        deleatble = false;

    }
    else {
        alert("There is no marker to be deleted.")
    }
}

document.addEventListener('DOMContentLoaded', function () {
    map = tt.map({
        key: "iJhhowAaIrAcbRVdJLMHfrj5e4v2VekB",
        container: "exploreMap",
        center: [-79.43898010253906, 43.903018951416016],
        zoom: 14
    });

});

const marker_data = [
    {
        "lat": 43.90691488643688,
        "lng": -79.43265008926438,
        "type": "waterFountain.png"
    },
    {
        "lat": 43.90273360044873,
        "lng": -79.43924041964709,
        "type": "washroom.png"
    },
    {
        "lat": 43.89416916908877,
        "lng": -79.44163397813762,
        "type": "electricalOutlet.png"
    },
    {
        "lat": 43.90303565410969,
        "lng": -79.43744353247858,
        "type": "playground.png"
    },
    {
        "lat": 43.90170408271908,
        "lng": -79.43232710931164,
        "type": "openField.png"
    },
    {
        "lat": 43.89537517312877,
        "lng": -79.44312656330553,
        "type": "washroom.png"
    }
];


function saveLocation() {
    if (!deleatble) {
        alert("There is no marker to be saved.")

    }
    else if (marker) {
        const lngLat = marker.getLngLat();
        var dd = document.getElementById("markerDropdown");
        var selected = dd.value;


        marker_data.push({
            lat: lngLat.lat,
            lng: lngLat.lng,
            type: selected
        })
        saved();
        marker.remove();
        console.log(marker_data);
    }
    deleatble = false;
}

function addMarker() {
    toggleMode();
    if (marker) {
        marker.remove();
    }

    marker = new tt.Marker({
        element: createMarkerElement("images/" + document.getElementById('markerDropdown').value)
    })
        .setLngLat(map.getCenter())
        .addTo(map)
        .setDraggable(true);
    deleatble = true;

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
    if (showOrHide) { //true means markers are shown
        shownMarkers.forEach(mar => mar.remove());
        shownMarkers = [];
        showOrHide = false;

    }
    else { //false means markers are hidden
        marker_data.forEach(markerr => {
            const mark = new tt.Marker({
                element: createMarkerElement(markerr.type)
            })
                .setLngLat([markerr.lng, markerr.lat])
                .addTo(map)
            shownMarkers.push(mark);
        })
        showOrHide = true;

    }
}
