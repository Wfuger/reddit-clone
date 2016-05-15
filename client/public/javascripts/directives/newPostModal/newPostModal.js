app.directive('newPostModal', function () {
    return {
        templateUrl: '/javascripts/directives/newPostModal/newPostModal.html',
        link: function (scope) {
            scope.$on('createPost', function (event, data) {
                scope.view.createPost = data;
            });

            //setInterval(function () {
            //    console.log(scope.view.createPost);
            //
            //}, 1000);
        }
    }
});