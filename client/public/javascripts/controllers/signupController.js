(function () {
    app.controller('SignupController', function ($scope, $http, $location, $window) {
        $scope.createUser = function () {
            console.log('cool', $scope.user);
            $http.post('/api/v1/users/signup', $scope.user)
                .then(function(response){
                    console.log(response.data);
                    //$rootScope.user = response.data;
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/')
                })
        }
    })
}());
