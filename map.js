var coords;

$.get("http://ipinfo.io", function(response) {
    if(response){
      coords = response.loc.split(",");
      initial_location(coords[0], coords[1]);
    }

} , "jsonp");


function initial_location(){

  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VoNHk4IiwiYSI6ImFZWVY1WEkifQ.yhJcrdrARJI1Zu0K3nWWvQ';

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

  var map = L.map('map').addLayer(mapboxTiles).setView([coords[0], coords[1]], 13);

  var marker = L.marker([coords[0], coords[1]]).addTo(map);

}
