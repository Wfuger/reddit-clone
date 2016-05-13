var express = require('express');
var router = express.Router();
var knex = require('../db/');

/* GET home page. */
router.get('/api/v1/getposts', function(req, res, next) {
  var result = {};
  knex('posts')
      .then(function(posts) {
          result.posts = posts;
      })
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

module.exports = router;
