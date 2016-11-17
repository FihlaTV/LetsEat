app.controller('BookingDetailCtrl', function($scope, $stateParams, $http) {

    $http.get("http://5.196.67.70:5000/letseat-api/event/" + $stateParams.id).then(function(res) {
        $scope.booking = res.data

        $http.get("http://5.196.67.70:5000/letseat-api/user/"+ res.data.createur).then(function(response) {
            $scope.user = response.data
        })
    })

})
