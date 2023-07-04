import L from "./leaflet.js";

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data = await res.json();

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  let geoJson = L.geoJson(data, {
    weight: 2,
    onEachFeature: function (feature, layer) {
      layer.bindTooltip(feature.properties.name);
    }
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());

  // Create and add OpenStreetMap tile layer to the map object
  var osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "&copy; OpenStreetMap contributors"
    }
  ).addTo(map);
};

fetchData();
