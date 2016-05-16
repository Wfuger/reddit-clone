(function () {
    app.controller('SignupController', function ($scope, $http, $location, $window, $rootScope) {
        $scope.createUser = function () {
            console.log('cool', $scope.user);
            $http.post('/api/v1/users/signup', $scope.user)
                .then(function(response){
                    $scope.user = {};
                    console.log("user from server", response.data);
                    $rootScope.user = response.data;
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/')
                })
        }
    })
}());
