app.controller('loginCtrl', function($scope, $cordovaOauth, $location, $LocalStorageService) {

    $scope.facebookLogin = function() {
        /*$cordovaOauth.facebook("216986545404454", ["email", "public_profile"]).then(function(result) {
            alert(result)
            $scope.state.go('home')
        }, function(error) {
            console.log(error)
        })*/

        $LocalStorageService.set("access_token", "00000000000")

        $location.path("/home")
    }

})
