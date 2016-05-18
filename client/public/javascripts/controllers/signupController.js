(function () {
    app.controller('SignupController', function ($scope, $http, $location, $window, $rootScope) {
        $scope.createUser = function () {
            console.log('cool', $scope.user);
            $http.post('/api/v1/users/signup', $scope.user)
                .then(function(response){
                    $scope.user = {};
                    console.log("user from server", response.data);
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/')
                    return $rootScope.user = response.data;
                })
        };
        $scope.loginUser = function () {
            $http.post('/api/v1/users/login', $scope.login)
                .then(function (response) {
                    $window.localStorage.setItem('token', response.data.token);
                    $location.path('/')
                    console.log(response.data)
                    return $rootScope.user = response.data
                })
        }
    })
}());
