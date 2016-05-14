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

                //console.log('inital newp',newPost);
                newPost.votes = 0;
                newPost.showTheComments = false;
                newPost.newComment= true;
                console.log('newP sent to server',newPost);
                return $http.post('http://localhost:3000/api/v1/post', newPost)
                    .then(function (result) {
                        return result;
                    })
            },
            vote: function(d, postId) {
                if (d === 'up') {
                    return $http.post('/ap1/v1/posts/' + postId + '/vote/up')
                        .then(function(result) {
                            return result;
                        })

                } else {
                    return $http.post('/ap1/v1/posts/' + postId + '/vote/down')
                        .then(function(result) {
                            return result;
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