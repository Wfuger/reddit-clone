app.controller('mainController', ['$scope', 'postService', function($scope, postService) {
        postService.getAllPosts().then(function(response){
            $scope.posts = response.posts;
            console.log('this would be cool if it works', $scope.posts);
        });
        $scope.view = {};
        $scope.makeNewComment = {};
        $scope.view.createPost = false;
        $scope.view.by = 'votes';
        $scope.view.reverse = true;
        $scope.showPost = function() {
            $scope.view.createPost = !$scope.view.createPost;
        };
        $scope.post = function() {
            $scope.newPost.votes = 0;
            $scope.newPost.date = moment().calendar();
            $scope.newPost.showTheComments = false;
            $scope.newPost.newComment = true;
            $scope.newPost.comments = [];
            $scope.view.reverse = true;
            $scope.posts.push($scope.newPost);
            $scope.newPost = {};
        };
        $scope.addComment = function(post) {
            post.newComment = !post.newComment;
        };
        $scope.comment = function(comment, post) {
            post.comments.push(comment);
            $scope.makeNewComment = {};
            post.newComment = true;
        };
        $scope.sorter = function(b) {
            b === 'votes' ? $scope.view.reverse = true : $scope.view.reverse = false;
            return $scope.view.by = b;
        };
        $scope.vote = function(vote, post) {
            return vote === 'up' ? post.votes++ : post.votes--;
        };

        $scope.showComments = function(post) {
            post.showTheComments = !post.showTheComments;
        }
    }]);
