let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let tagSchema = new Schema({
    name: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
let Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;