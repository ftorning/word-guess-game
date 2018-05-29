console.log('Ayyyooo');

var test_lat = 40;
var test_lng = 75 * -1;

function initMap(lat, lng) {
    var coords = {lat: lat, lng: lng};
    var map = new google.maps.Map(
        document.getElementById('map'),
        {zoom: 5, center: coords, mapTypeId: 'hybrid'}
    );
    var marker = new google.maps.Marker({position: coords, map: map});
}

initMap(test_lat, test_lng);