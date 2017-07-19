let express = require('express');
let router = express.Router();
let postModel = require('../model/post');
/* GET home page. */
router.get('/', function(req, res, next) {
  postModel.find((err, pages) => {
    res.render('index', { pages: pages });
  })
});

module.exports = router;
