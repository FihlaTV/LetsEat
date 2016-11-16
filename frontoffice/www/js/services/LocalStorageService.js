app.factory('$LocalStorageService', function () {
    return {
        set: function (key, value) {
            localStorage.setItem(key, value);
        },
        get: function (key) {
            return localStorage.getItem(key);
        },
        setObject: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getObject: function (key) {
            return JSON.parse(localStorage.getItem(key) || '{}');
        },
        isExist: function (key) {
            var bool = false;
            if(localStorage.getItem(key) !== null)
                bool = true;
            return bool;
        }
    }
});