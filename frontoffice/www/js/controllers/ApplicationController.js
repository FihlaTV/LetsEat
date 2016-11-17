app.controller('applicationCtrl', function($scope, UsersService, $location) {

    setTimeout(function() {
        connectCheck()
    }, 10)

    window.onhashchange = function() {
        connectCheck()
    }

    const connectCheck = function() {
        $scope.isConnect = UsersService.isConnect()

        if(!$scope.isConnect)
            $location.path("/new_event")
    }


})
