var myIcon = L.icon({
  iconUrl: "./icons/location.svg",
  iconRetinaUrl: "my-icon@2x.png",
  iconSize: [38, 95],
  iconAnchor: [22, 75],
  popupAnchor: [-3, -48],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

var marker;

export function renderMap(map, lat, lng, location) {
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoianBjb2RlciIsImEiOiJja2poanF4a2gzbWh4MnJwOTI3YXE5aWtlIn0.aZqFUWUcdZpM6i09cFSjVQ",
    }
  ).addTo(map);

  initializePosition(map, lat, lng, location);
  
}

function initializePosition(map, lat, lng, location) {
  marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
  marker.bindPopup(location).openPopup();
  
}

function movePositionMarkEvent(e, map, popUpLocation) {
  marker.setOpacity(0);
  marker.unbindPopup();
  marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: myIcon }).addTo(map);
  marker.bindPopup(popUpLocation).openPopup();
}

export function movePositionMark(map, lat, lng, location) {
    marker.setOpacity(0);
    marker.unbindPopup();
    marker = L.marker([lat, lng], { icon: myIcon }).addTo(map);
    marker.bindPopup(location).openPopup();
    
   
  }

export function mapOnClick(map, popUpLocation){
    map.on("click", function(e){
        console.log(e);
        movePositionMarkEvent(e, map, popUpLocation)
    });
}