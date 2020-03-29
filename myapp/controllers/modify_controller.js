const toRegister = require('../models/db_query');

module.exports = class Member {
	postRegister(req, res, next) {

		var dt1 = new Date();
		const ip_Addr = {
			ip : req.connection.remoteAddress,
			expire_time : dt1.getTime() + 1000 * 10,
			remain_req : 5
		}
		toRegister(ip_Addr).then( (result) => {
			
			res.set({
				'X-RateLimit-Remaining' : result.remain_req,
				'X-RateLimit-Reset' : result.time + " min:sec"
			});
			res.end();
		}, (result) => {
			res.set({
				'X-RateLimit-Remaining' : result.remain_req,
				'X-RateLimit-Reset' : result.time + " min:sec"
			});
			res.status(429).send("Error 429.\n Too many Request.");
			res.end();
		})

	}

}
