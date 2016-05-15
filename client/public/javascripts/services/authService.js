(function () {

    app.factory('authInterceptor', function($location) {
        return {
            request: function (config) {
                if ( localStorage.getItem('token') ) {
                    config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
                }
                return config;
            },

            responseError: function (response) {
                if (response.status === 403) {
                    localStorage.clear();
                    $location.path('/signup');
                }

                return response;
            }
        }
    })
}());