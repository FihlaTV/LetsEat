
app.controller('newEventCtrl', function($scope, $http, $stateParams,$LocalStorageService) {
	angular.module("myApp", ["ionic", "ion-datetime-picker"]);

	const user = $LocalStorageService.getObject("user_profile")

	$scope.credential = {
		"createur": user.id_user,
	    "nom": "",
	    "description": "",
		"prix": "",
		"picture": "",
		"date": "",
	    "nb_participant": 1,
	    "adresse": {
			"line": "",
			"postalCode": "",
			"city": "",
			"country": ""
		},
	    "participants": []
	}

	$scope.step = 'city'

	var options = {
  		types: ['(cities)']
 	};

 	//var input = document.getElementById('city');
 	//var autocomplete = new google.maps.places.Autocomplete(input, options);

	var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.608625, lng: 3.879747},
        zoom: 4,
        disableDefaultUI: true
    });
    const geocoder = new google.maps.Geocoder()

    $scope.cityLocation = function(city) {
    	$scope.credential.adresse.city = city
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

    $scope.submit = function(credential) {
    	$http.post("http://5.196.67.70:5000/letseat-api/event", credential).then(function(res){
			swal("Good job!", "Votre atelier est bien été créé", "success")
		}, function(error) {
			sweetAlert("Oops...", "Votre atelier n'a pas été créé!", "error");
		})
	}
});