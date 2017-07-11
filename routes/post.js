let express = require('express');
let router = express.Router();
let articleModel = require('../model/article');
let tagModel = require('../model/tag');
let markdown = require('markdown').markdown;
let tagsArr = [];
let searchTag = (name, userId, resolve, flag) => {
    tagModel.findOne({'name':name}, (err, tag) => {
        if (tag) {
            tagsArr.push(tag._id);
        } else {
            tagModel.create({'name':name, author:userId}, (err, tag) => {
                tagsArr.push(tag._id);
                if (flag) {
                    resolve(tagsArr);
                }
            })
        }
    })
}
router.get('/', function(req, res, next) {
    res.render('post');
});

router.post('/', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    //处理tags
    tagsArr = [];
    let tags = req.body.tag;
    let userId = req.session.user._id;
    var _promise = new Promise((resolve, reject) => {
        if (tags.indexOf(',') < 0) {
            let name = tags ? tags : 'default';
            searchTag(name, userId, resolve, true);
        } else {
            tags = tags.split(',');
            let flag = false;
            for (let [key, elem] of tags.entries()) {
                if (key == tags.length - 1) {
                    flag = true;
                }
                searchTag(elem, userId, resolve, flag);
            }
        }
    });
    _promise.then((arr) => {
        let articleEntity = new articleModel({
            title: req.body.title,
            tags:  arr,
            content: markdown.toHTML(req.body.content),
            author: userId
        });
        articleEntity.save((err) => {
            if (err) {
                console.log('保存错误');
            } else {
                console.log('保存成功');
                res.redirect('/');
            }
        })
    })
});

module.exports = router;