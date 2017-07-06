var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog',{
  useMongoClient:true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected!');
});

module.exports = mongoose;