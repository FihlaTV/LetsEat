app.controller('commentCtrl', function($scope, $http, $stateParams) {

	$http.get("http://5.196.67.70:5000/letseat-api/user/"+$stateParams.id).then(function(res) {
		$scope.user =res.data[0];
    });

})