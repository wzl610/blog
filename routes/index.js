var express = require('express');
var router = express.Router();
var Blog = require('../model/blog');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    console.log('session:'+req.session.user)
  } else {
    console.log(req.session);
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
