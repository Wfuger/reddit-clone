var express = require('express');
var router = express.Router();
var knex = require('../db/');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */

router.get('/post', function(req, res, next) {
    console.log("fuck");
    var result = {};
    knex('posts')
        .then(function(posts) {
            result.posts = posts;
            console.log("fuckity fuck fuck fuck")
        });
    return knex('comments')
        .then(function(comments) {
            console.log("no fucks given left")
            for (var i = 0; i < result.posts.length; i++) {
                result.posts[i].comments = [];
                for (var j = 0; j < comments.length; j++) {
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
    //return knex('posts')
    //    .orderBy('id')
    //    .then(function (posts) {
    //        console.log('butt stuff');
    //        res.json(posts)
    //    })
});

router.post('/post', function(req, res, next) {
    return knex('posts').insert(req.body).returning('*')
        .then(function(post){
        });
    return knex('posts')
        .orderBy('id')
        .then(function (posts) {
            res.json(posts)
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
router.post('/users/signup', function (req, res, next) {
    console.log(req.body, "motha trucka");
    var errors = [];
    if ( !req.body.username || !req.body.username.trim() ) errors.push("Username can't be blank");
    if ( !req.body.password || !req.body.password.trim() ) errors.push("Password can't be blank");

    if (errors.lenght) {
        res.status(422).json({ errors: errors })
    } else {
        knex('users').whereRaw('lower(username) = ?', req.body.username.toLowerCase())
            .count()
            .first()
            .then(function (result) {
                console.log(result, "result from user check");
                if(result.count === "0") {
                    var saltRounds = 9;
                    var passwordHash = bcrypt.hashSync(req.body.password, saltRounds);
                    return knex('users')
                        .insert({username: req.body.username, password_hash: passwordHash})
                        .returning('*')
                        .then(function (users) {
                            var user = users[0];
                            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
                            res.json({
                                id: user.id,
                                username: user.username,
                                token: token
                            })
                        })
                } else {
                    res.status(422).json({
                        errors: ['User alread exists!']
                    })
                }
            })
    }
});

module.exports = router;
