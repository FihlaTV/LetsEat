app.factory('UsersService', function () {
    return {
        setUser: function (key, value) {
            //localStorage.setItem(key, JSON.stringify(value));
        },
        getUser: function (key) {
            //return JSON.parse(localStorage.getItem(key) || '{}');
        },
        isConnect: function (key) {
            var bool = false;
            if(localStorage.getItem("access_token") !== null)
                bool = true;
            return bool;
        }
    }
});