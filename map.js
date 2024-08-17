const CN_TOWER = {lat: 43.64269, lon: -79.38705}
import { API_KEY } from 'SECRET.js';

var map = tt.map({
    key: API_KEY,
    container: 'map',
    center: CN_TOWER,
    zoom: 10,
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());