let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let postSchema = new Schema({
    title: String,
    date: {
        type: Date,
        default: Date.now()
    },
    content: String
});
postSchema.pre('remove', function(next) {
    var post = this;
    post.model('TagPost').update(
        { pid: post._id }, 
        { $unset: { pid: 1 } }, 
        { multi: true },
        next);
});
module.exports = mongoose.model('Post', postSchema);