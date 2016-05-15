app.controller('mainController', ['$scope', 'postService', function($scope, postService) {
    postService.getAllPosts()
        .then(function(response){
            response.posts.forEach(function(i){
                $scope.posts.push(i);
            });
        });
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
    $scope.$watch('posts', function (posts) {
        console.log("posts from $watch muh fucka", posts);
        $scope.$broadcast('newPost', posts)

    }, true);
    $scope.showPostForm = function() {
        $scope.view.createPost = !$scope.view.createPost;
    };
    $scope.post = function () {
        postService.addPost($scope.newPost)
            .then(function (newPost) {
                console.log("Adding new post to array");
                $scope.posts.push(newPost);
            });
    };

    $scope.deletePost = function (post_id) {
        //console.log(post_id)
        postService.deletePost(post_id)
            .then(function (result) {
                console.log("delete post result: ", result)
                //$scope.posts = result;
            });
    };

    $scope.addComment = function(post) {
        post.newComment = !post.newComment;
    };
    $scope.newComment = function(comment, post) {
        var postId = post.id;
        postService.addComment(comment, postId)
            .then(function (newComment) {
            });
        $scope.makeNewComment = {};
        post.newComment = true;
    };
    $scope.deleteComment = function (id) {
        postService.deleteComment(id)
            .then(function (result) {
                console.log(result)
            });
    };
    $scope.sorter = function(b) {
        b === 'votes' ? $scope.view.reverse = true : $scope.view.reverse = false;
        return $scope.view.by = b;
    };
    $scope.vote = function(vote, post) {
        postService.vote(vote, post)
            .then(function (result) {
                console.log("booya", result);
                $scope.posts.map(function (i) {
                    console.log(i.id, result.id, "butt stuff");
                    return i.id === result.id
                        ? i.id = result.id
                        : i
                })
            })
    };
    $scope.showComments = function(post) {
        post.showTheComments = !post.showTheComments;
    };
}]);
