var express = require('express');
var router = express.Router();
var knex = require('../db/');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


/* GET users listing. */

router.get('/me', function ( req, res, next ) {
    if ( req.headers.authorization ) {
        var token = req.headers.authorization.split(' ')[1];
        console.log("token: ",token);
        try {
            var payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log('invalid token', err)
        }
        console.log("payload: ", payload);
        if (payload) {
            knex('users').where({ id: payload.id }).first().then(function(user){
                if (user) {
                    delete user.password_hash;
                    user.name = user.username;
                    delete  user.username;
                    res.json( user )
                } else {
                    res.json({ error: 'invalid ID' })
                }
            });
        } else {
            console.log('throw an error');
            res.status(422).json({ error: 'invalid user'})
        }
    } else {
        res.json({ error: "No token breh" })
    }
});

router.post('/login', function (req, res, next) {
    var errors = [];
    if ( !req.body.username || !req.body.username.trim() ) errors.push("Username can't be blank");
    if ( !req.body.password || !req.body.password.trim() ) errors.push("Password can't be blank");

    if (errors.length) {
        res.status(422).json({ errors: errors })
    } else {
        return knex('users').whereRaw('lower(username) = ?', req.body.username.toLowerCase())
            .then(function (user) {
                console.log(user, "user b")
                if(user.length) {
                    var isUser = bcrypt.compareSync(req.body.password, user[0].password_hash);
                    if (isUser) {
                        var user = user[0];
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
                        res.json({
                            id: user.id,
                            name: user.username,
                            token: token
                        })
                    } else {
                        //res.error({ error: "invalide" })
                        console.log("invalid password")
                    }
                } else {
                    // invalid username
                    console.log("invalid username")
                }
            })
    }
});

router.post('/signup', function (req, res, next) {
    var errors = [];
    if ( !req.body.username || !req.body.username.trim() ) errors.push("Username can't be blank");
    if ( !req.body.password || !req.body.password.trim() ) errors.push("Password can't be blank");

    if (errors.length) {
        res.status(422).json({ errors: errors })
    } else {
        knex('users').whereRaw('lower(username) = ?', req.body.username.toLowerCase())
            .count()
            .first()
            .then(function (result) {
                if(result.count === "0") {
                    var passwordHash = bcrypt.hashSync(req.body.password, 9);
                    return knex('users')
                        .insert({username: req.body.username, password_hash: passwordHash})
                        .returning('*')
                        .then(function (users) {
                            var user = users[0];
                            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
                            res.json({
                                id: user.id,
                                name: user.username,
                                token: token
                            })
                        })
                } else {
                    res.status(422).json({
                        errors: ['User already exists!']
                    })
                }
            })
    }
});


module.exports = router;
