app.controller('searchCtrl', function($scope, $DateService, $http) {

    $scope.credential = {
        'city': '',
        'date': '',
        'participant': 1
    }

    $scope.step = 'city'
    $scope.dates = []

    $scope.submit = function() {
        if ($scope.step == 'city')
            $scope.step = 'date'
        else
            $scope.step = 'recap'
    }

    $scope.search = function(credential) {
        console.log(credential)
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
