// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    'Satellite Streets': satelliteStreets,
    'Streets': streets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 10,
    layers: [satelliteStreets]
})

// Accessing the airport GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/wwpa65/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// function buildPopup(feature, layer) {
//     layer.bindPopup('Airport: ' + feature.properties.faa);
// }

// Create a style for the fill colors.
var myStyle = {
    "fillColor": "yellow",
    "color": "blue",
    "weight": 1,
    "opacity": 1,
    "fillOpacity": 0.2
};


d3.json(torontoHoods).then(function (data) {

    L.geoJSON(data, {
        style: myStyle
    }).addTo(map);
});

// Pass our map layers into our layers control and add the layers control to the map.

L.control.layers(baseMaps).addTo(map);