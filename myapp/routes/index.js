var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/controller');

memberModifyMethod = new MemberModifyMethod();

/* GET home page. */
router.get('/', memberModifyMethod.Register);
router.get('/test', function(req, res) {
	res.send('Hello');
});
module.exports = router;
