// Import Mapbox as an ESM module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

// Check that Mapbox GL JS is loaded
console.log('Mapbox GL JS Loaded:', mapboxgl);

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaGh1YTkyMTIiLCJhIjoiY21wNXN2eDg1MTN6bTJzb2F0dnU4YjN1bCJ9.PKXv56Mv3XBHfKk4ueB7hQ';
// mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN_HERE';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-71.09415, 42.36027],
  zoom: 12,
  minZoom: 5,
  maxZoom: 18,
});

// Shared bike lane style
const bikeLaneStyle = {
  'line-color': '#32D400',
  'line-width': 5,
  'line-opacity': 0.6,
};

// Wait for the map to load before adding data
map.on('load', () => {
  // Boston bike lanes source
  map.addSource('boston_route', {
    type: 'geojson',
    data: 'https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson',
  });

  // Boston bike lanes layer
  map.addLayer({
    id: 'boston-bike-lanes',
    type: 'line',
    source: 'boston_route',
    paint: bikeLaneStyle,
  });

  // Cambridge bike lanes source
  map.addSource('cambridge_route', {
    type: 'geojson',
    data: 'https://data.cambridgema.gov/resource/7icy-6n4i.geojson',
  });

  // Cambridge bike lanes layer
  map.addLayer({
    id: 'cambridge-bike-lanes',
    type: 'line',
    source: 'cambridge_route',
    paint: bikeLaneStyle,
  });
});