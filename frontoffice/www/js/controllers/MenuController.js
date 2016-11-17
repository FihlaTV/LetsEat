app.controller('menuCtrl', function($scope, $LocalStorageService, $location) {

	$scope.user = $LocalStorageService.getObject("user_profile")

	$scope.logout = function() {
		$LocalStorageService.remove("access_token")
		$location.path("/login")

	}
})
