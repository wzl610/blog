let moogoose = require('../config/mongo');
let userSchema = moogoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    sex: {
        type: String,
        enum: ['man', 'woman']
    }
});

let User = moogoose.model('User', userSchema);
module.exports = User;
