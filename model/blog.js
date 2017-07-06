var mongoose = require('../config/mongo');
var blogSchema = mongoose.Schema({
    name: String
});
var Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;