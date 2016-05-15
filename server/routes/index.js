var express = require('express');
var router = express.Router();
var knex = require('../db/');

/* GET home page. */
router.get('/getposts', function(req, res, next) {
    var result = {};
    knex('posts')
        .then(function(posts) {
            result.posts = posts;
        });
    knex('comments')
        .then(function(comments) {
            result.comments = comments;
            for (var i = 0; i < result.posts.length; i++) {
                result.posts[i].comments = [];
                for (var j = 0; j < result.comments.length; j++) {
                    if (result.posts[i].id === result.comments[j].post_id) result.posts[i].comments.push(result.comments[j])
                }
            }
            delete result.comments;
            res.json(result);
        })
});

router.post('/post', function(req, res, next) {
    return knex('posts').insert(req.body).returning('*')
        .then(function(posts){
            res.json(posts)
        });
});

router.post('/posts/:id/vote/:d', function (req, res, next) {
    var votes = req.body.votes;
    req.params.d === 'up' ? ++votes : --votes;
    return knex('posts').where({id: req.params.id}).update({votes: votes}).returning('*')
        .then(function (result) {
            res.json(result);
        })
});

router.post('/comments/add/', function (req, res, next) {
    return knex('comments').insert(req.body).returning('*')
        .then(function (comment) {
            res.json(comment)
        })
});

module.exports = router;
