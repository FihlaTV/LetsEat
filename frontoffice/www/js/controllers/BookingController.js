app.controller('bookingCtrl', function($scope, $http, $LocalStorageService) {

    const user = $LocalStorageService.getObject("user_profile")
    $http.get("http://5.196.67.70:5000/letseat-api/events/booking/"+user.id_user).then(function(res) {
        $scope.bookings = res.data
    })

    $scope.formatDate = function(date) {
        if(date !== undefined) {
            var dateOut = new Date(date.toString().substring(0, 19))
            return dateOut
        }
    }

})