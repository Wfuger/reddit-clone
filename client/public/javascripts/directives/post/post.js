app.directive('post', function(){
   return {
       templateUrl: '/javascripts/directives/post/post.html',
       link: function (scope) {
           scope.$on('newPost', function (event, data) {
                console.log("data  from directive", data);
                scope.posts = data;
                //scope.$apply();
           });
       }
   }
});