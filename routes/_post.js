require("babel-core/register");
require("babel-polyfill");
let postModel = require('../model/post');
let {tagModel, tagPostModel} = require('../model/tag');
let commentModel = require('../model/comment');
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
        content: req.body.content
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
router.get('/', (req, res, next) => {
    res.render('post');
});

router.get('/:postId', async (req, res, next) => {
    var postId = req.params.postId;
    let post = await postModel.findOne({_id: postId}, (err, post) => {
        if (err) {
            console.log('获取出错');
        }
    });
    post.content = markdown.toHTML(post.content);
    let comments = await commentModel.find({article: postId}, (err, comments) => {
        if(err) {
            console.log('获取出错');
        }
    });
    res.render('article', {post: post, comments: comments});
});

router.post('/', async (req, res, next) => {
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

router.get('/:postId/edit', (req, res, next) => {
    var postId = req.params.postId;
    postModel.findOne({_id: postId}, (err, post) => {
        res.render('edit', {post: post});
    })
});

router.post('/:postId/edit', (req, res, next) => {
    var postId = req.params.postId;
    var post = {
        title: req.body.title,
        content: req.body.content
    }
    postModel.update({_id: postId}, post, (err) => {
        if(!err) {
            res.redirect('/');
        } else {
            console.log('更新失败:' + err);
        }
    })
});

router.get('/:postId/remove', (req, res, next) => {
    var postId = req.params.postId;
    postModel.findOne({_id: postId}, (err, postDoc) => {
        postDoc.remove({_id: postId}, (err) => {
            if (err) {
                console.log('err');
            } else {
                res.redirect('/');
            }
        })
    })
});

router.post('/:postId/comment', (req, res, next) => {
    var postId = req.params.postId;
    var commentDoc = {
        comment: req.body.comment,
        author: req.body.name,
        article: postId
    };
    commentModel.create(commentDoc, (err, comment) => {
        if(!err) {
            res.redirect(`/post/${postId}`);
        } else {
            console.log('添加失败:' + err);
        }
    })
});

module.exports = router;