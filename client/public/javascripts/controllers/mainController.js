app.controller('mainController', function($scope, postService, currentUser, $rootScope) {
    postService.getAllPosts()
        .then(function(response){
            response.posts.forEach(function(i){
                $scope.posts.push(i);
            });
        });
    console.log(currentUser, "fucking fuck")
    $scope.user = currentUser;
    $scope.view = {};
    $scope.posts = [];
    $scope.makeNewComment = {};
    $scope.newPost = {};
    $scope.view.createPost = false;
    $scope.view.by = 'votes';
    $scope.view.reverse = true;

    $scope.$watch('view.createPost', function(newValue){
        $scope.$broadcast('createPost', newValue);
    });
    //$scope.$watch('posts', function (posts) {
    //    console.log("posts from $watch muh fucka", posts);
    //    $scope.$broadcast('newPost', posts)
    //}, true);
    $rootScope.showPostForm = function() {
        $scope.view.createPost = !$scope.view.createPost;
    };
    $scope.post = function () {
        console.log($scope.user, "fuck this")
        $scope.newPost.user_id = $scope.user.id;
        postService.addPost($scope.newPost)
            .then(function (newPost) {
                newPost.comments = [];
                $scope.posts.push(newPost);
            });
        $scope.view.createPost = false;
        $scope.newPost = {};
    };

    $scope.deletePost = function (post_id) {
        postService.deletePost(post_id)
            .then(function (result) {
                for (var i = 0; i < $scope.posts.length; i++) {
                    if ($scope.posts[i].id === result.id) $scope.posts.splice(i, 1)
                }
            });
    };

    $scope.addComment = function(post) {
        post.newComment = !post.newComment;
    };

    $scope.newComment = function(post) {
        console.log($scope.user, "user obj bitch")
        post.userId = $scope.user.id;
        console.log(post, 'oh my gerd fuck fuck fuck fuck')
        postService.addComment(post)
            .then(function (newComment) {
                post.comments.push(newComment);
                post.comment = null;
            });
        post.newComment = false;
    };
    $scope.deleteComment = function (id, post) {
        postService.deleteComment(id)
            .then(function (result) {
                for (var i = 0; i < post.comments.length; ++i) {
                    if (post.comments[i].id === id) post.comments.splice(i, 1)
                }
            });
    };
    $scope.sorter = function(b) {
        b === 'votes' ? $scope.view.reverse = true : $scope.view.reverse = false;
        return $scope.view.by = b;
    };
    $scope.vote = function(vote, post) {
        postService.vote(vote, post)
            .then(function (result) {
                for (var i = 0; i < $scope.posts.length; i++) {
                    if ($scope.posts[i].id === result.id) {
                        var comments = $scope.posts[i].comments;
                        result.comments = comments;
                        $scope.posts.splice(i, 1);
                        $scope.posts.push(result);
                    }
                }
            })
    };
    $scope.showComments = function(post) {
        post.showTheComments = !post.showTheComments;
    };
});
