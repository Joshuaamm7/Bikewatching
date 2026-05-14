// Import Mapbox as an ESM module
import mapboxgl from 'https://cdn.jsdelivr.net/npm/mapbox-gl@2.15.0/+esm';

// Import D3
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// Check that Mapbox GL JS is loaded
console.log('Mapbox GL JS Loaded:', mapboxgl);

// Set your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaGh1YTkyMTIiLCJhIjoiY21wNXN2eDg1MTN6bTJzb2F0dnU4YjN1bCJ9.PKXv56Mv3XBHfKk4ueB7hQ';

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [-71.09415, 42.36027],
  zoom: 12,
  minZoom: 5,
  maxZoom: 18,
});

// Select the SVG layer inside the map
const svg = d3.select('#map').select('svg');

// Bluebikes station data URL
const BLUEBIKES_STATIONS_URL =
  'https://dsc106.com/labs/lab07/data/bluebikes-stations.json';

// Shared bike lane style
const bikeLaneStyle = {
  'line-color': '#32D400',
  'line-width': 5,
  'line-opacity': 0.6,
};

// Helper function to convert station longitude/latitude into screen coordinates
function getCoords(station) {
  const point = new mapboxgl.LngLat(+station.lon, +station.lat);
  const { x, y } = map.project(point);
  return { cx: x, cy: y };
}

// Wait for the map to load before adding data
map.on('load', async () => {
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

  let stations;

  try {
    const jsonData = await d3.json(BLUEBIKES_STATIONS_URL);

    console.log('Loaded JSON Data:', jsonData);

    stations = jsonData.data.stations;

    console.log('Stations Array:', stations);
  } catch (error) {
    console.error('Error loading JSON:', error);
    return;
  }

  // Append circles to the SVG for each station
  const circles = svg
    .selectAll('circle')
    .data(stations)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('fill', 'steelblue')
    .attr('stroke', 'white')
    .attr('stroke-width', 1)
    .attr('opacity', 0.8);

  // Function to update circle positions when the map moves/zooms
  function updatePositions() {
    circles
      .attr('cx', (d) => getCoords(d).cx)
      .attr('cy', (d) => getCoords(d).cy);
  }

  // Initial position update
  updatePositions();

  // Reposition markers on map interactions
  map.on('move', updatePositions);
  map.on('zoom', updatePositions);
  map.on('resize', updatePositions);
  map.on('moveend', updatePositions);
});