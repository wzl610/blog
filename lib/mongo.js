var config = require('config-lite');
var Mongolass = require('mogolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mogolass.model('User',{
	name:{type:'string'},
	password:{type:'string'},
	avatar:{type:'string'},
	gender:{type:'string',enum:['m','f','x']},
	bio:{type:'string'}
});

exports.User.index({name:1},{unique:true}).exec();