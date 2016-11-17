app.controller('homeCtrl', function($scope, $LocalStorageService) {

    $scope.results = $LocalStorageService.getObject("results");

    $scope.event_history = $LocalStorageService.getObject("event_history");

    $scope.user = $LocalStorageService.getObject("user_profile")

})