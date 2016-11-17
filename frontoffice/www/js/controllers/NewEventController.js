
app.controller('newEventCtrl', function($scope, $http, $stateParams,$LocalStorageService) {
	angular.module("myApp", ["ionic", "ion-datetime-picker"]);

	$scope.user = $LocalStorageService.getObject("user_profile")

	$scope.adresse = {
		"line":"",
		"postalCode": "",
        "city": "",
        "country": ""
	}
	$scope.date = {
        "date": ""
	}

	$scope.credential = {
		"createur": $scope.user.prenom,
	    "nom": "",
	    "description": "",
	    "nb_participant": "",
	    "prix": "",
	    "adresse": $scope.adresse,
	    "picture": "",
	    "dates":[$scope.date]
	}



console.log($scope.credential);
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

    $scope.submit = function(credential) {
    	console.log($scope.credential);
    	$http.post("http://5.196.67.70:5000/letseat-api/event", $scope.credential).then(function(res){
			swal("Good job!", "Votre profil est bien modifié", "success")
		}, function(error) {
			sweetAlert("Oops...", "Votre profil n'est pas modifié!", "error");
		})
	}
});