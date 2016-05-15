app.controller('mainController', ['$scope', 'postService', function($scope, postService) {
        postService.getAllPosts().then(function(response){
            $scope.posts = response.posts;
        });
        $scope.view = {};
        $scope.makeNewComment = {};
        $scope.newPost = {};
        $scope.view.createPost = false;
        $scope.view.by = 'votes';
        $scope.view.reverse = true;

        $scope.$watch('view.createPost', function(newValue){
            $scope.$broadcast('createPost', newValue);
        });
        $scope.showPostForm = function() {
            $scope.view.createPost = !$scope.view.createPost;
            console.log($scope.view.createPost)
        };
        $scope.post = function () {
            postService.addPost($scope.newPost);
        };

        $scope.addComment = function(post) {
            post.newComment = !post.newComment;
        };
        $scope.newComment = function(comment, post) {
            var postId = post.id;
            //post.comments.push(comment);
            postService.addComment(comment, postId);
            $scope.makeNewComment = {};
            post.newComment = true;
        };
        $scope.sorter = function(b) {
            b === 'votes' ? $scope.view.reverse = true : $scope.view.reverse = false;
            return $scope.view.by = b;
        };
        $scope.vote = function(vote, post) {
            postService.vote(vote, post)
        };
        $scope.showComments = function(post) {
            post.showTheComments = !post.showTheComments;
        }
    }]);
