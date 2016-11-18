app.controller('RoomCtrl', function($scope, $http, $stateParams, $LocalStorageService) {

    $scope.id_user = $LocalStorageService.getObject("user_profile").id_user

    var data
    $http.get("http://5.196.67.70:5000/letseat-api/room/"+$stateParams.id).then(function(res) {
        data = res.data
        data.participants.forEach(function (user) {
            $http.get("http://5.196.67.70:5000/letseat-api/user/"+user.id_user).then(function(ress) {
                user.userJSON = ress.data[0]
                $scope.room = data
            })
        })
        data.messages.forEach(function (user) {
            $http.get("http://5.196.67.70:5000/letseat-api/user/"+user.id_user).then(function(ress) {
                user.userJSON = ress.data[0]
                $scope.room = data
            })
        })
    })

    var socket = io.connect("http://5.196.67.70:5010")

    socket.on("send", function(receive){
        if(receive.id_room == $stateParams.id) {
            var user
            data.participants.forEach(function (part) {
                if (part.id_user == receive.id_user)
                    user = part.userJSON
            })


            $scope.$apply(function () {
                $scope.room.messages.push({
                    "id_user": receive.id_user,
                    "messages": receive.message,
                    "userJSON": user
                })
            })

            element = document.getElementById('messages-box');
            element.scrollTop = element.scrollHeight;
        }
    })

    $scope.send = function (message) {
        socket.emit("receive", {
            "id_room": $stateParams.id,
            "id_user": $scope.id_user,
            "message": message
        })
        $scope.message = ""
    }
})


app.controller('messageCtrl', function($scope, $http, $LocalStorageService) {

    const user = $LocalStorageService.getObject("user_profile")

    $http.get("http://5.196.67.70:5000/letseat-api/" + user.id_user + "/room").then(function(res) {
        var data = res.data
        data.forEach(function(room) {
            if (room.messages.length > 0) {
                room.lastMessage = room.messages[(room.messages.length - 1)].messages
                var id = room.messages[(room.messages.length - 1)].id_user
                $http.get("http://5.196.67.70:5000/letseat-api/user/" + id).then(function (ress) {
                    room.lastUser = ress.data[0]
                    $scope.rooms = data
                })
            } else {
                $scope.rooms = data
            }
        })
    })

})