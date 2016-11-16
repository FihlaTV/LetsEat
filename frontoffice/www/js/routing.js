app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        'url': '/login',
        'templateUrl': 'templates/login.html',
        'controller': 'loginCtrl'
    })

    $stateProvider.state('home', {
        'url': '/home',
        'templateUrl': 'templates/home.html'
    })

    $stateProvider.state('search', {
        'url': '/search',
        'templateUrl': 'templates/search.html',
        'controller': 'searchCtrl'
    })

    $stateProvider.state('message', {
        'url': '/message',
        'templateUrl': 'templates/messages.html'
    })
    
    $stateProvider.state('menu', {
        'url': '/menu',
        'templateUrl': 'templates/menu.html'
    })

    $urlRouterProvider.otherwise('/home')

});
