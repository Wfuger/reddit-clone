app.service('postService', function($http) {
    var self = this;
    self.posts = null;

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
            return $http.get('/api/v1/posts/edit' + post.id, post)
                .then(function(result){
                    return result;
                })
        },

    }

});