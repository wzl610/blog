let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let tagSchema = new Schema({
    name: String
});

let tagPostSchema = new Schema({
    tid: {
        type: Schema.ObjectId,
        ref: 'Tag'
    },
    pid: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});

module.exports.tagModel = mongoose.model('Tag', tagSchema);
module.exports.tagPostModel = mongoose.model('TagPost', tagPostSchema);
