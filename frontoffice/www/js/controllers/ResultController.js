app.controller('resultCtrl', function($scope, $LocalStorageService, $location, $http, $stateParams) {

    var results = $LocalStorageService.getObject("results")

    if($stateParams.id == 'none') {
        results[0].result.forEach(function (event) {
            $http.get("http://5.196.67.70:5000/letseat-api/user/" + event.createur).then(function (res) {
                event.creatorUser = res.data
                $scope.result = results[0].result
            })
        })
    } else {
        results[$stateParams.id].result.forEach(function (event) {
            $http.get("http://5.196.67.70:5000/letseat-api/user/" + event.createur).then(function (res) {
                event.creatorUser = res.data
                $scope.result = results[$stateParams.id].result
            })
        })
    }

})
