const CN_TOWER = {lat: 43.64269, lon: -79.38705}

var map = tt.map({
    key: 'i58bnGL2TYgPbRmsWNAAI4vy2fc5gkIT',
    container: 'map',
    center: CN_TOWER,
    zoom: 10,
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());