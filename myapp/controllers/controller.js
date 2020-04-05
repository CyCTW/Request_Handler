const toRegister = require('../models/db_query');
const exp_time = 1000 * 60 * 60;
module.exports = class Member {
	
	Register(req, res, next) {
		var dt1 = new Date();
		const ip_Addr = {
			ip : req.connection.remoteAddress,
			expire_time : dt1.getTime() + exp_time,
			remain_req : 1000
		}
		toRegister(ip_Addr).then( (result) => {
			
			res.set({
				'X-RateLimit-Remaining' : result.remain_req,
				'X-RateLimit-Reset' : result.time + " min:sec"
			});
			if (result.status == 429) {
				res.status(429).send("Error 429.\n Too many Request.");
			}
			res.end();
		}, (err) => {
			throw err;
		})

	}

}
