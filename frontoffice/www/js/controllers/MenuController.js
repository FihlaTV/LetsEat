app.controller('menuCtrl', function($scope, $LocalStorageService) {

	$scope.user = $LocalStorageService.getObject("user_profile")
})
