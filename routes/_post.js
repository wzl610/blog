require("babel-core/register");
require("babel-polyfill");
let postModel = require('../model/post');
let {tagModel, tagPostModel} = require('../model/tag');
let express = require('express');
let router = express.Router();
let markdown = require('markdown').markdown;
let bindTagPost = async (tags, postId) => {
    if (!tags) {
        tags = ['default'];
    } else if (tags.indexOf(',') < 0) {
        tags = [tags];
    } else {
        tags = tags.split(',');
    }
    for (let [key, elem] of tags.entries()) {
        let tagId = await createTag(elem);
        await createTagPost(tagId, postId);
    }
}
let createPost = async (req) => {
    let postObj = {
        title: req.body.title,
        content: markdown.toHTML(req.body.content)
    }
    return await new Promise((resolve, reject) => {
        postModel.create(postObj, (err, post) => {
            resolve(post._id);
        })
    });
}
let createTag = async (name) => {
    let tag = await new Promise((resolve, reject) => {
        tagModel.findOne({'name':name})
        .exec((err, tag) => {
            resolve(tag);
        });
    });
    if (tag) {
        return tag._id;
    } else {
        return await new Promise((resolve, reject) => {
            tagModel.create({'name':name}, (err, tag) => {
                resolve(tag._id);
            })
        })
    }
}
let createTagPost = async (tagId, postId) => {
    let obj = {
        tid: tagId,
        pid: postId
    };
    return await new Promise((resolve, reject) => {
        tagPostModel.create(obj, (err, entire) => {
            if(!err) {
                console.log('保存成功');
                resolve();
            } else {
                console.log('保存失败');
                reject(err);
            }
        })
    })
}
router.get('/', function(req, res, next) {
    res.render('post');
});

router.post('/', async function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    let tags = req.body.tag;
    let postId = await createPost(req);
    try{
        await bindTagPost(tags, postId);
    } catch (e) {
        console.log(e);
    }
    res.redirect('/');
});

module.exports = router;