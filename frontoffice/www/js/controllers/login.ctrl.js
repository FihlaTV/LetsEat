app.controller('loginCtrl', function($scope, $cordovaOauth, $location) {

    $scope.facebookLogin = function() {
        /*$cordovaOauth.facebook("216986545404454", ["email", "public_profile"]).then(function(result) {
            alert(result);
            $scope.state.go('home');
        }, function(error) {
            console.log(error);
        });*/

        $location.path("/home");
    };

});
