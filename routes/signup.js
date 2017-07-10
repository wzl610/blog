let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let userModel = require('../model/user');

router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {
    let username = req.body.username;
    userModel.findOne({'name': username},'name',(err, user) => {
        if (user) {
            alert('账号已存在，请登录!')
            res.redirect('/signin');
        } else {
            //保存
            let userObj = {
                name: username,
                password: sha1(req.body.password),
                sex: req.body.sex,
                intro: req.body.intro
            };
            let userEntity = new userModel(userObj);
            let userPromise = userEntity.save();
            userPromise.then((err) => {
                delete userObj.password;
                req.session.user = userObj;
                res.redirect('/');
            }).catch((err) => {
                console.log(err);
            });
        }
    })
});

module.exports = router;