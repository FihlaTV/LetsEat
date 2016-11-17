app.controller('loginCtrl', function($scope, $FacebookService) {

    $scope.facebookLogin = function() {
        $FacebookService.connect()
    }

})
