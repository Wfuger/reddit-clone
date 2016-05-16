app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
    $httpProvider.interceptors.push('authInterceptor');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'javascripts/partials/posts.html',
            controller: 'mainController',
            resolve: {
                currentUser: function ($http, $location) {
                    return $http.get('/api/v1/users/me')
                        .then(function (response) {
                            console.log("FUASDLKFJAWEKLJFAWELKFJSALKJFD",response);
                            return response.data
                        })
                        .catch(function () {
                            localStorage.clear();
                            $location.path('/');
                            return null;
                        })
                }
            }

        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'javascripts/partials/signup.html',
            controller: 'SignupController'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});