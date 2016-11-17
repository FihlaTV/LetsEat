app.controller('BookingDetailCtrl', function($scope, $stateParams, $http, $LocalStorageService) {

    var data
    const geocoder = new google.maps.Geocoder()

    var eventHistory = $LocalStorageService.getObject("event_history")

    $http.get("http://5.196.67.70:5000/letseat-api/event/" + $stateParams.id).then(function(res) {
        data = res.data

        $http.get("http://5.196.67.70:5000/letseat-api/user/"+ res.data.createur).then(function(response) {
            data.creatorUser = response.data[0]
            $scope.booking = data

            eventHistory.splice(0, 0, data)
            if(eventHistory.length >= 5)
                eventHistory.pop()
            $LocalStorageService.setObject("event_history", eventHistory)

            geocoder.geocode({ 'address': data.adresse.city }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var map
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: results[0].geometry.location,
                        zoom: 12,
                        disableDefaultUI: true
                    })

                    marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map,
                        icon: {
                            url: 'img/marker.svg'
                        }
                    })

                } else {
                    alert('Geocode was not successful for the following reason: ' + status)
                }
            })

        })
    })

    $scope.formatDate = function(date) {
        if(date !== undefined) {
            var dateOut = new Date(date.toString().substring(0, 19))
            return dateOut
        }
    }

})
