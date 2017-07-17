"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require("babel-core/register");
require("babel-polyfill");
var postModel = require('../model/post');

var _require = require('../model/tag'),
    tagModel = _require.tagModel,
    tagPostModel = _require.tagPostModel;

var express = require('express');
var router = express.Router();
var markdown = require('markdown').markdown;
var bindTagPost = function _callee(tags, postId) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, elem, tagId;

    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if (!tags) {
                        tags = ['default'];
                    } else if (tags.indexOf(',') < 0) {
                        tags = [tags];
                    } else {
                        tags = tags.split(',');
                    }
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 4;
                    _iterator = tags.entries()[Symbol.iterator]();

                case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 16;
                        break;
                    }

                    _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], elem = _step$value[1];
                    _context.next = 10;
                    return regeneratorRuntime.awrap(createTag(elem));

                case 10:
                    tagId = _context.sent;
                    _context.next = 13;
                    return regeneratorRuntime.awrap(createTagPost(tagId, postId));

                case 13:
                    _iteratorNormalCompletion = true;
                    _context.next = 6;
                    break;

                case 16:
                    _context.next = 22;
                    break;

                case 18:
                    _context.prev = 18;
                    _context.t0 = _context["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 22:
                    _context.prev = 22;
                    _context.prev = 23;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 25:
                    _context.prev = 25;

                    if (!_didIteratorError) {
                        _context.next = 28;
                        break;
                    }

                    throw _iteratorError;

                case 28:
                    return _context.finish(25);

                case 29:
                    return _context.finish(22);

                case 30:
                case "end":
                    return _context.stop();
            }
        }
    }, null, undefined, [[4, 18, 22, 30], [23,, 25, 29]]);
};
var createPost = function _callee2(req) {
    var postObj;
    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    postObj = {
                        title: req.body.title,
                        content: markdown.toHTML(req.body.content)
                    };
                    _context2.next = 3;
                    return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                        postModel.create(postObj, function (err, post) {
                            resolve(post._id);
                        });
                    }));

                case 3:
                    return _context2.abrupt("return", _context2.sent);

                case 4:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, undefined);
};
var createTag = function _callee3(name) {
    var tag;
    return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                        tagModel.findOne({ 'name': name }).exec(function (err, tag) {
                            resolve(tag);
                        });
                    }));

                case 2:
                    tag = _context3.sent;

                    if (!tag) {
                        _context3.next = 7;
                        break;
                    }

                    return _context3.abrupt("return", tag._id);

                case 7:
                    _context3.next = 9;
                    return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                        tagModel.create({ 'name': name }, function (err, tag) {
                            resolve(tag._id);
                        });
                    }));

                case 9:
                    return _context3.abrupt("return", _context3.sent);

                case 10:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, undefined);
};
var createTagPost = function _callee4(tagId, postId) {
    var obj;
    return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    obj = {
                        tid: tagId,
                        pid: postId
                    };
                    _context4.next = 3;
                    return regeneratorRuntime.awrap(new Promise(function (resolve, reject) {
                        tagPostModel.create(obj, function (err, entire) {
                            if (!err) {
                                console.log('保存成功');
                                resolve();
                            } else {
                                console.log('保存失败');
                                reject(err);
                            }
                        });
                    }));

                case 3:
                    return _context4.abrupt("return", _context4.sent);

                case 4:
                case "end":
                    return _context4.stop();
            }
        }
    }, null, undefined);
};
router.get('/', function (req, res, next) {
    res.render('post');
});

router.post('/', function _callee5(req, res, next) {
    var tags, postId;
    return regeneratorRuntime.async(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    if (!req.session.user) {
                        res.redirect('/');
                    }
                    tags = req.body.tag;
                    _context5.next = 4;
                    return regeneratorRuntime.awrap(createPost(req));

                case 4:
                    postId = _context5.sent;
                    _context5.prev = 5;
                    _context5.next = 8;
                    return regeneratorRuntime.awrap(bindTagPost(tags, postId));

                case 8:
                    _context5.next = 13;
                    break;

                case 10:
                    _context5.prev = 10;
                    _context5.t0 = _context5["catch"](5);

                    console.log(_context5.t0);

                case 13:
                    res.redirect('/');

                case 14:
                case "end":
                    return _context5.stop();
            }
        }
    }, null, this, [[5, 10]]);
});

module.exports = router;
