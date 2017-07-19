let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let commentSchema = new Schema({
    comment: String,
    time: {
        type: Date,
        default: new Date()
    },
    author: String,
    article: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});
module.exports = mongoose.model('Comment', commentSchema);
