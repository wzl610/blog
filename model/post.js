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
module.exports = mongoose.model('Post', postSchema);