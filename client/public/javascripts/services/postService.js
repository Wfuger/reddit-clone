(function () {

    app.service('postService', function($http) {

        return {
            getAllPosts: function() {
                return $http.get('/api/v1/post')
                    .then(function(result){
                        return  result.data;
                    })
                    .catch(function(e){
                        console.log("error from get/posts", e)
                    })
            },
            deletePost: function (post_id) {
                return $http.post('/api/v1/post/delete/' + post_id)
                    .then(function (result) {
                        console.log("result from server delete: ",result.data);
                        return result.data[0];
                    })
                    .catch(function(e){
                        console.log("error", e)
                    })
            },
            addPost: function (newPost) {
                newPost.votes = 0;
                console.log("WTF MATE", newPost)
                return $http.post('/api/v1/post', newPost)
                    .then(function (result) {
                        result.data[0].comments = [];
                        console.log('slksd', result);
                        return result.data[0];
                    })
                    .catch(function(e){
                        console.log("error", e)
                    })
            },
            addComment: function (post) {
                var newComment = {};
                newComment.comment = post.comment;
                newComment.post_id = post.id;
                newComment.user_id = post.userId;
                delete post.userId;
                console.log(newComment, "comment from post service")
                return $http.post('/api/v1/comments/add/', newComment)
                    .then(function(result) {
                        return result.data[0];
                    })
                    .catch(function(e){
                        console.log("error", e)
                    })
            },
            deleteComment: function (comment_id) {
                return $http.post('/api/v1/comments/delete/'+ comment_id)
                    .then(function (result) {
                        return result.data[0];
                    })
                    .catch(function (e) {
                        console.log(e);
                    })
            },
            vote: function(d, post) {
                if (d === 'up') {
                    return $http.post('/api/v1/post/' + post.id + '/vote/up', post)
                        .then(function(result) {
                            console.log(result, 'result')
                            return result.data[0];
                        })
                        .catch(function(e){
                        console.log("error", e)
                    })
                } else {
                    return $http.post('/api/v1/post/' + post.id + '/vote/down', post)
                        .then(function(result) {
                            console.log(result, 'result')
                            return result.data[0];
                        })
                        .catch(function(e){
                        console.log("error", e)
                    })
                }
            },
            editPost: function (post) {
                return $http.post('/api/v1/posts/edit' + post.id, post)
                    .then(function (result) {
                        return result;
                    })
                    .catch(function(e){
                        console.log("error", e)
                    })
            },
        }
    });
}());