app.factory('$FacebookService', function ($LocalStorageService, $cordovaOauth, $http, $location) {
    return {
        connect: function () {
            var bool = false

            $cordovaOauth.facebook("216986545404454", ["email", "public_profile"]).then(function(result) {

                $LocalStorageService.set("access_token", result.access_token)
                $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(results) {
                    $http.get("http://5.196.67.70:5000/letseat-api/user/"+results.data.id).then(function(resultGetUser) {
                        if(resultGetUser.data.length <= 0 || resultGetUser.data[0].id_user === undefined || resultGetUser.data[0].id_user != results.data.id) { //USER NOT EXIST
                            $http.post("http://5.196.67.70:5000/letseat-api/user", {
                                'id_user': results.data.id,
                                'nom': '',
                                'prenom': results.data.name,
                                'picture': results.data.picture.data.url,
                                'age': 0,
                                'sexe': results.data.gender,
                                'email': '',
                                'ville': '',
                                'phone': '',
                                'notes': []
                            }).then(function() {
                                $LocalStorageService.set("user_profile", results.data)
                                $location.path("/home")
                            }, function(errorrr) {
                                swal("Erreur !", "Votre profil n'a pas pu être créé", "error")
                            });
                        } else {
                            $LocalStorageService.set("user_profile", resultGetUser.data)
                            $location.path("/home")
                        }

                    }, function(errorrr) {
                        console.log(errorrr)
                        swal("Erreur !", "Connexion échoué", "error")
                    });

                    //$scope.state.go('home')
                }, function(errorr) {
                    console.log(errorr)
                    swal("Erreur !", "Connexion échoué", "error")
                });

            }, function(error) {
                console.log(error)
                swal("Erreur !", "Connexion échoué", "error")
            })

            return false
        }
    }
});