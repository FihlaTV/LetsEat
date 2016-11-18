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

                }
            })

        })
    })

    $scope.reservation = function () {
        var iduser = $LocalStorageService.getObject("user_profile").id_user
        var idevent = $stateParams.id
        var idcreator = $scope.booking.createur

        $http.get("http://5.196.67.70:5000/letseat-api/event/"+idevent).then(function (res) {

            var find = false
            res.data.participants.forEach(function(participant) {
                if(participant.id == iduser)
                    find = true
            })

            if(!find) {
                $http.get("http://5.196.67.70:5000/letseat-api/event/reservation/"+idevent+"&"+iduser).then(function () {
                    swal("Réussi !", "Votre réservation est bien effective", "success")

                    $http.post("http://5.196.67.70:5000/letseat-api/room", {
                        nom: $scope.booking.nom,
                        participants: [{id_user: iduser}, {id_user: idcreator}],
                        messages: []
                    }).then(function(){
                        console.log("ok room create")
                    })

                }, function (error) {
                    swal("Erreur !", "Une erreur est survenu lors de la réservation", "error")
                })
            } else {
                swal("Erreur !", "Vous avez déjà reservé cet atelier", "error")
            }

        }, function (error) {
            swal("Erreur !", "Une erreur est survenue veuillez recommencer", "error")
        })
    }

    $scope.formatDate = function(date) {
        if(date !== undefined) {
            var dateOut = new Date(date.toString().substring(0, 19))
            return dateOut
        }
    }

})
