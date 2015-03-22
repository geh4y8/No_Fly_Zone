var coords;

$.get("http://ipinfo.io", function(response) {
    if(response){
      coords = response.loc.split(",");
      initial_location(coords[0], coords[1]);
    }

} , "jsonp");




function initial_location(){

  $.get("http://api.geonames.org/findNearby?lat=" + coords[0] +"&lng=" + coords[1] +"&fcode=AIRP&radius=35&maxRows=100&username=geh4y8", function (response){
    if(response){
      console.log(response);
    }
  }, "xml");

  L.mapbox.accessToken = 'pk.eyJ1IjoiZ2VoNHk4IiwiYSI6ImFZWVY1WEkifQ.yhJcrdrARJI1Zu0K3nWWvQ';

  var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-i87786ca/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

  var map = L.map('map').addLayer(mapboxTiles).setView([coords[0], coords[1]], 13);

  var marker = L.marker([coords[0], coords[1]]).addTo(map);

  var circle = L.circle([51.508, -0.11], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);

}
