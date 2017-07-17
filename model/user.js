let mongoose = require('../config/mongo');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    sex: {
        type: String,
        enum: ['man', 'woman']
    },
    intro: String
});

module.exports = mongoose.model('User', userSchema);
