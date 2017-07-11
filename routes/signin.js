let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let userModel = require('../model/user');

router.get('/', function(req, res, next) {
    res.render('signin');
});

router.post('/', function(req, res, next) {
    let username = req.body.username;
    let password = sha1(req.body.password);
    userModel.findOne({'name': username}, (err,user) => {
        if (!user) {
            console.log('请先注册!');
            res.redirect('/signup');
            return;
        }
        if (password !== user.password) {
            console.log('密码错误!');
            return;
        }
        req.session.user = user;
        console.log('登录成功!');
        res.redirect('/');
    })
});

module.exports = router;