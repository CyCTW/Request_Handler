var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/modify_controller');

memberModifyMethod = new MemberModifyMethod();

router.post('/register', memberModifyMethod.postRegister);

/* GET home page. */
router.get('/', memberModifyMethod.postRegister);

router.post('/', function(req, res, next) {
	console.log(req.body.test)
});
router.post('/postdemo', function(req, res, next){
	var userName = req.body.username;
	var password = req.body.password;
	if(userName == 'BigQ' && password=='30days'){
		res.send('hi, '+userName);
	}
	else{
		res.send('password wrong '+userName);
	}
}); 
router.get('/getIp', function(req, res, next) {
	console.log(req.headers['x-forward-for']);
})
module.exports = router;
