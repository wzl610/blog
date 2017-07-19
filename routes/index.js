let express = require('express');
let router = express.Router();
let postModel = require('../model/post');
let markdown = require('markdown').markdown;
/* GET home page. */
router.get('/', function(req, res, next) {
  postModel.find((err, posts) => {
    posts.forEach(function(post) {
      post.content = markdown.toHTML(post.content);
    }, this);
    res.render('index', { posts: posts});
  })
});

module.exports = router;
