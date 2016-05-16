var express = require('express');
var router = express.Router();
var knex = require('../db/');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */

router.get('/post', function(req, res, next) {
    var result = {};
    //knex('users')
    //    .then(function (users) {
    //        result.users = users;
    //    });
    knex('posts')
        .then(function(posts) {
            result.posts = posts;
        });
    return knex('comments')
        .then(function(comments) {
            for (var i = 0; i < result.posts.length; ++i) {
                result.posts[i].comments = [];
                for (var j = 0; j < comments.length; ++j) {
                    //for (var k = 0; k < result.users; ++k) {
                    //    if()
                    //}
                    if (result.posts[i].id === comments[j].post_id) result.posts[i].comments.push(comments[j])
                }
            }
            delete result.comments;
            res.json(result);
        });
});

router.post('/post/delete/:id', function (req, res, next) {
    return knex('posts').where({id: req.params.id}).del()
        .returning('*')
        .then(function (result) {
            res.json(result)
        });
});

router.post('/post/:id/vote/:d', function (req, res, next) {
    var votes = req.body.votes;
    req.params.d === 'up' ? ++votes : --votes;
    return knex('posts').where({id: req.params.id}).update({votes: votes}).returning('*')
        .then(function (result) {
            console.log('vote change');
            res.json(result);
        });
});

router.post('/post', function(req, res, next) {
    return knex('posts').insert(req.body).returning('*')
        .then(function(post){
            res.json(post)
        });
});

router.post('/comments/add/', function (req, res, next) {
    console.log(req.body)
    return knex('comments').insert(req.body).returning('*')
        .then(function (comment) {
            console.log("comment: ",comment);
            res.json(comment)
        });
});

router.post('/comments/delete/:id', function (req, res, next) {
    return knex('comments').where({id: req.params.id}).del().returning('*')
        .then(function (comment) {
            res.json(comment)
        })
});

module.exports = router;
