app.controller('resultCtrl', function($scope, $LocalStorageService, $location, $http) {

    var result = $LocalStorageService.getObject("result")

    result.forEach(function(event) {
        $http.get("http://5.196.67.70:5000/letseat-api/user/"+event.createur).then(function(res) {
            event.creatorUser = res.data
            $scope.result = result
        })
    })

})
