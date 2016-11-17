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

    $stateProvider.state('booking', {
        'url': '/booking',
        'templateUrl': 'templates/booking.html'
    })

    $stateProvider.state('booking_detail', {
        'url': '/booking/{id}',
        'templateUrl': 'templates/booking_detail.html'
    })

    $stateProvider.state('profil', {
        'url': '/profil',
        'templateUrl': 'templates/user_profil.html'
    })

    $stateProvider.state('map', {
        'url': '/map',
        'templateUrl': 'templates/map.html',
        'controller': 'mapCtrl'
    })

    $stateProvider.state('edit_user', {
        'url': '/edit_user',
        'templateUrl': 'templates/edit_user.html'
    })

    $urlRouterProvider.otherwise('/home')

});
