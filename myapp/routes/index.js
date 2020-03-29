var express = require('express');
var router = express.Router();

const MemberModifyMethod = require('../controllers/controller');

memberModifyMethod = new MemberModifyMethod();

/* GET home page. */
router.get('/', memberModifyMethod.Register);

module.exports = router;
