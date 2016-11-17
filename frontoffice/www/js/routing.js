app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        'url': '/login',
        'templateUrl': 'templates/login.html',
        'controller': 'loginCtrl'
    })

    $stateProvider.state('home', {
        'url': '/home',
        'templateUrl': 'templates/home.html',
        'controller': 'homeCtrl'
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
        'templateUrl': 'templates/menu.html',
        'controller': 'menuCtrl'
    })

    $stateProvider.state('booking', {
        'url': '/booking',
        'templateUrl': 'templates/booking.html'
    })

    $stateProvider.state('booking_detail', {
        'url': '/booking/{id}',
        'templateUrl': 'templates/booking_detail.html',
        'controller': 'BookingDetailCtrl'
    })

    $stateProvider.state('profil', {
        'url': '/profil/{id}',
        'templateUrl': 'templates/user_profil.html',
        'controller': 'profilUserCtrl'
    })

    $stateProvider.state('map', {
        'url': '/map',
        'templateUrl': 'templates/map.html',
        'controller': 'mapCtrl'
    })

    $stateProvider.state('edit_user', {
        'url': '/edit_user/{id}',
        'templateUrl': 'templates/edit_user.html',
        'controller': 'profilUserCtrl'
    })

    $stateProvider.state('comment', {
        'url': '/comment/{id}',
        'templateUrl': 'templates/comment.html',
        'controller': 'commentCtrl'
    })

    $stateProvider.state('result', {
        'url': '/result/{id}',
        'templateUrl': 'templates/result.html',
        'controller': 'resultCtrl'
    })
    
    $stateProvider.state('new_event', {
        'url': '/new_event',
        'templateUrl': 'templates/new_event.html',
        'controller': 'newEventCtrl'
    })

    $urlRouterProvider.otherwise('/home')

});
