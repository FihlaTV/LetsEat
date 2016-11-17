app.controller('newEventCtrl', function($scope, $http, $stateParams) {

	$scope.credential = {
		'city': ''
	}

	$scope.step = 'city'

	var options = {
  		types: ['(cities)']
 	};

 	var input = document.getElementById('city');
 	var autocomplete = new google.maps.places.Autocomplete(input, options);

	var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.608625, lng: 3.879747},
        zoom: 4,
        disableDefaultUI: true
    });
    const geocoder = new google.maps.Geocoder()

    $scope.cityLocation = function(city) {
    	geocoder.geocode( {'address': city}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location)
                map.setZoom(12)
            } else {
                alert('Geocode was not successful for the following reason: ' + status)
            }
        })
    }

    $scope.next = function() {
    	$scope.step = 'info'
    }
});