import { API_KEY } from 'SECRET.js';

let map;
let marker;
let showOrHide = false;
let deleatble = false;
let shownMarkers = [];
function toggleMode() {
    newtoggleMode("Drag the logo");
}

function newtoggleMode(message) {
    let toastBox = document.getElementById('toastBox');
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = '<i class="fa-solid fa-arrow-pointer"></i>' + message;
    toastBox.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}



function saved() {
    newtoggleMode("The marker has been saved.");
}
function del() {
    if (deleatble) {
        marker.remove();
        deleatble = false;

    }
    else {
        newtoggleMode("There is no marker to be deleted.");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    map = tt.map({
        key: API_KEY,
        container: "exploreMap",
        center: [-79.4391775, 43.9029436],
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
        newtoggleMode("There is no marker to be saved.");
    }
    else if (marker) {
        const lngLat = marker.getLngLat();
        var dd = document.getElementById("markerDropdown");
        var selected = dd.value;


        marker_data.push({
            lat: lngLat.lat,
            lng: lngLat.lng,
            type: selected
        });
        saved();
        if (showOrHide) {
            shownMarkers.push(marker);
        }
        else {
            marker.remove();

        }
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
        element: createMarkerElement("../images/" + document.getElementById('markerDropdown').value)
    })
        .setLngLat(map.getCenter())
        .addTo(map)
        .setDraggable(true);
    deleatble = true;

}


document.getElementById('markerDropdown').addEventListener('change', function (event) {
    if (marker) {
        const current = marker.getLngLat();
        marker.remove();
        marker = new tt.Marker({
            element: createMarkerElement("../images/" + document.getElementById('markerDropdown').value)

        })
            .setLngLat(current)
            .addTo(map)
            .setDraggable(true);

    }
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
                element: createMarkerElement("../images/" + markerr.type)
            })
                .setLngLat([markerr.lng, markerr.lat])
                .addTo(map)
            shownMarkers.push(mark);
        })
        showOrHide = true;

    }
}
