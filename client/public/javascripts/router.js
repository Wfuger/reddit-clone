app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
       .state('home', {
           url: '/',
           templateUrl: 'javascripts/partials/posts.html'
       });
    $urlRouterProvider.otherwise('/');
});