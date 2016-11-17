app.controller('profilUserCtrl', function($scope, $http, $stateParams) {

	$http.get("http://5.196.67.70:5000/letseat-api/user/"+$stateParams.id).then(function(res) {
		console.log(res.data[0]);
		$scope.user = res.data[0];
		$scope.lastcomment =$scope.user.notes[0];
    });

	$scope.submit = function(user) {
		var id = user._id
		delete user._id
		delete user._v
		$http.put("http://5.196.67.70:5000/letseat-api/user/"+id, user).then(function(res){
			swal("Good job!", "Votre profil est bien modifié", "success")
		}, function(error) {
			sweetAlert("Oops...", "Votre profil n'est pas modifié!", "error");
		})
	}
	
})