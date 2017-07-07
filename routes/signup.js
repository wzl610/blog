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
            console.log('账号已存在，请登录!')
            res.render('signin');
        } else {
            //保存
            let userEntity = new userModel({
                name: username,
                password: sha1(req.body.password),
                sex: req.body.sex
            });
            let userPromise = userEntity.save();
            userPromise.then((err) => {
                res.render('index');
            })
        }
    })
});

module.exports = router;