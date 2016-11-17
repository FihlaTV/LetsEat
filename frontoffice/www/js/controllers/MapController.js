app.controller('mapCtrl', function($scope, $cordovaGeolocation, $http) {

    $http.get("http://5.196.67.70:5000/letseat-api//events/citydate/Montpellier&2016").then(function(res) {
        var data = res.data
        data.forEach(function(d) {
            d.selected = false
        })
        data[0].selected = true
        $scope.activities = data
        setMarkers(map)
    });

    var map;
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 43.608625, lng: 3.879747},
        zoom: 12,
        disableDefaultUI: true
    });
    const geocoder = new google.maps.Geocoder()

    map.addListener('click', function() {
        $scope.$apply(function(){
            $scope.popup.hide = true
        });
    });

    var markers = [];

    var setMarkers = function(map) {
        $scope.activities.forEach(function(activity) {
            var marker;
            geocoder.geocode(
                {
                    'address': activity.adresse.line + ' ' + activity.adresse.postalCode + ' ' + activity.adresse.city + ' ' + activity.adresse.country
                },
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        marker = new google.maps.Marker({
                            position: results[0].geometry.location,
                            map: map,
                            icon: {
                                url: 'img/marker.svg'
                            }
                        })
                        markers.push(marker)

                        markers[0].setIcon({
                            url: 'img/marker_selected.svg'
                        })

                        marker.addListener('click', function() {
                            markers.forEach(function(item){
                                item.setIcon({
                                    url: 'img/marker.svg'
                                })
                            })
                            this.setIcon({
                                url: 'img/marker_selected.svg'
                            })
                            $scope.activities.forEach(function(event) {
                                event.selected = false
                            })
                            $scope.$apply(function(){
                                activity.selected = true
                            })
                        })
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status)
                    }
                }
            )
        })
    }

})
