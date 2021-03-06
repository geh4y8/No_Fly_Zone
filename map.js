var coords;

var airports = false;

$.get("http://ipinfo.io", function(response) {
    if(response){
      coords = response.loc.split(",");
      check_for_airports(coords[0], coords[1]);
    }

} , "jsonp");


function check_for_airports(lat, lng){

  $.get("http://api.geonames.org/findNearby?lat=" + lat +"&lng=" + lng +"&fcode=AIRP&radius=5&maxRows=100&username=geh4y8", function (response){
    if(response){
      airports = true;
      initial_location(lat, lng, response);
    } else{
      initial_location(lat, lng);
    }
  }, "xml");
}


function initial_location(lat, lng, airports){

  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VoNHk4IiwiYSI6ImFZWVY1WEkifQ.yhJcrdrARJI1Zu0K3nWWvQ';

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

  var map = L.map('map').addLayer(mapboxTiles).setView([lat, lng], 10);

  if(airports){
    var ports = airports.getElementsByTagName("geoname");
    for (var i = 0; i<ports.length; i++){
      var port = ports[i];
      var portLat = port.children[2].innerHTML;
      var portLng = port.children[3].innerHTML;
      L.circle([portLat, portLng], 8000, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(map);
      L.marker([portLat, portLng]).addTo(map).bindPopup(port.children[1].innerHTML);

    }

    //alerts the user that they are in no fly zone
    swal({
      title: 'no fly zone',
      text: 'You cannot fly here, ' + ports[0].children[1].innerHTML + ' is within a five mile radius!',
      type: 'warning'
    });

  } else {
    swal({
      title: 'Good to go!'
    })
  }

}
