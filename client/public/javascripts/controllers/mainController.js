app.controller('mainController', ['$scope', function($scope) {
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
        $scope.posts = [{
            title: 'Unique New York',
            votes: 0,
            author: 'Yo momma',
            image: 'http://www.fillmurray.com/200/300',
            description: '',
            date: moment().calendar(),
            comments: [],
            newComment: true,
            showTheComments: false
        }, {
            title: 'Bill Freaking Murray',
            votes: 10,
            author: 'That One Guy',
            image: 'http://www.fillmurray.com/200/302',
            description: 'Is that Bill Murray?  Golf course it is.',
            date: moment().calendar(),
            comments: [],
            newComment: true,
            showTheComments: false
        }, {
            title: 'More Bill Effing Murray',
            votes: 5,
            author: 'Some Dude',
            image: 'http://www.fillmurray.com/200/303',
            description: 'The coolest man alive',
            date: moment().calendar(),
            comments: [{
                author: 'Yo momma',
                comment: 'comment 1'
            }
            ],
            newComment: true,
            showTheComments: false
        }];
        $scope.showComments = function(post) {
            post.showTheComments = !post.showTheComments;
        }
    }]);
