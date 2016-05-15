(function () {


    app.service('postService', function($http) {
        //const newPost = $scope.newPost

        return {
            getAllPosts: function() {
                return $http.get('/api/v1/getposts')
                    .then(function(result){
                        return result.data;
                    })
                    .catch(function(e){
                        console.log(e)
                    })
            },
            addPost: function (newPost) {
                newPost.votes = 0;
                return $http.post('/api/v1/post', newPost)
                    .then(function (result) {
                        return result.data[0];
                    })
            },
            addComment: function (newComment, postId) {
                newComment.post_id = postId;
                return $http.post('/api/v1/comments/add/', newComment)
                    .then(function(result) {
                        console.log(result)
                    })
            },
            vote: function(d, post) {
                if (d === 'up') {
                    return $http.post('/api/v1/posts/' + post.id + '/vote/up', post)
                        .then(function(result) {
                            return result.data[0];
                        })
                } else {
                    return $http.post('/api/v1/posts/' + post.id + '/vote/down', post)
                        .then(function(result) {
                            return result.data[0];
                        })
                }
            },
            editPost: function (post) {
                return $http.post('/api/v1/posts/edit' + post.id, post)
                    .then(function (result) {
                        return result;
                    })
            },

        }

    });
}());