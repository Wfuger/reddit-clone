(function () {

    app.controller('SignupController', function ($scope, $http, $location, $window) {
        $scope.createUser = function () {
            console.log('cool');
            $http.post('/api/v1/users/signup', $scope.user)
                .then(function(response){
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/')
                })

        }
    })
}());
