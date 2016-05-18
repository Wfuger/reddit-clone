var express = require('express');
var router = express.Router();
var knex = require('../db/');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */

router.get('/post', function(req, res, next) {
    var result = {};
    knex('posts')
        .select('posts.*', 'users.username')
        .leftJoin('users', 'users.id', 'posts.user_id')
        .then(function(posts) {
            delete posts.password_hash;
            console.log(posts, 'posts with users hopefully')
            result.posts = posts;
        });
    return knex('comments')
        .innerJoin('users', 'users.id', 'comments.user_id')
        .then(function(comments) {
            //console.log(comments, 'comments with users maybeh')
            for (var i = 0; i < result.posts.length; ++i) {
                result.posts[i].comments = [];
                for (var j = 0; j < comments.length; ++j) {
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
    console.log(req.body, 'votes')
    var votes = req.body.votes;
    req.params.d === 'up' ? ++votes : --votes;
    return knex('posts').where({id: req.params.id}).update({votes: votes}).returning('*')
        .then(function (result) {
            console.log('vote change', result);
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

//function getUsers(req, res, next){
//    var result = {}
//    knex('users')
//        .joinRAW
//}

module.exports = router;
