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