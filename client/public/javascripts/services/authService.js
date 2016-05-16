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
                console.log(response)
                if (response.status === 403 || response.status === 422) {
                    localStorage.clear();
                    $location.path('/');
                }

                return response;
            }
        }
    })
}());