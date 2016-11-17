app.controller('searchCtrl', function($scope, $DateService, $http, $LocalStorageService, $location) {

    $scope.credential = {
        'city': '',
        'date': '',
        'participant': 1
    }

    $scope.count = false;

    $scope.step = 'city'
    $scope.dates = []

    $scope.submit = function() {
        if ($scope.step == 'city')
            $scope.step = 'date'
        else
            $scope.step = 'recap'

        if($scope.step == 'recap') {
            $http.get("http://5.196.67.70:5000/letseat-api/events/citydate/count/"+$scope.credential.city+"&2016").then(function(res){
                $scope.count = res.data
            }, function(error){
                console.log(error)
            })
        }
    }

    $scope.search = function(credential) {
        $http.get("http://5.196.67.70:5000/letseat-api/events/citydate/"+$scope.credential.city+"&2016").then(function(res){
            $LocalStorageService.setObject("result", res.data)
            $location.path("/result")
        }, function(error){
            console.log(error)
        })
    }

    $scope.changeStep = function (step) {
        $scope.step = step
    }

    $scope.incrementParticipant = function() {
        $scope.credential.participant++
    }

    $scope.decrementParticipant = function() {
        if($scope.credential.participant > 1)
            $scope.credential.participant--
    }

    var dateBase = new Date()
    setTimeout(function() {
        for(var i = 0; i < 12; i++)
            $scope.dates.push($DateService.addMonth(dateBase))
    }, 10)

})
