let express = require('express');
let router = express.Router();

router.get('/',function(req,res){
	res.send('hello express');
});

module.exports = router;