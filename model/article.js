let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let articleSchema = new Schema({
    title: String,
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    content: String,
    tags: [Schema.ObjectId]
});
let Article = mongoose.model('Article', articleSchema);
module.exports = Article;