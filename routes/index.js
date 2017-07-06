var express = require('express');
var router = express.Router();
var Blog = require('../model/blog');
/* GET home page. */
router.get('/', function(req, res, next) {
  var blog = new Blog({'name': 'AllenWang'});
  var promise = blog.save();
  promise.then(function () {
    console.log('save succeeded!');
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
