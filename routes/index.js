let express = require('express');
let router = express.Router();
let postModel = require('../model/post');
let markdown = require('markdown').markdown;
/* GET home page. */
router.get('/', function(req, res, next) {
  postModel.find((err, pages) => {
    pages.forEach(function(page) {
      page.content = markdown.toHTML(page.content);
    }, this);
    res.render('index', { pages: pages });
  })
});

module.exports = router;
