app.controller('BookingDetailCtrl', function($scope, $stateParams, $http) {

    var data;

    $http.get("http://5.196.67.70:5000/letseat-api/event/" + $stateParams.id).then(function(res) {
        data = res.data

        $http.get("http://5.196.67.70:5000/letseat-api/user/"+ res.data.createur).then(function(response) {
            data.creatorUser = response.data[0]
            $scope.booking = data
        })
    })

    $scope.formatDate = function(date) {
        if(date !== undefined) {
            var dateOut = new Date(date.toString().substring(0, 19))
            return dateOut
        }
    }

})
