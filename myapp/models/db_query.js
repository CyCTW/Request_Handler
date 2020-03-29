const db = require('./connection_db');
const req_limit = 5;
const time_limit = 1000 * 10;
module.exports = function register(memberData) {
	let result = {};
	return new Promise((resolve, reject) => {
		db.query('SELECT * FROM connect_info WHERE ip = ?', memberData.ip, function(err, rows) {
			if(err) {
				console.log(err);
				return;
			}

			if(rows.length >= 1) {
				var dt = parseInt(rows[0].expire_time, 10);
				var now = new Date().getTime();
					
				console.log(rows)
				// var diff = new Date(now - dtt);
				var diff = dt - now;
				if (diff < 0) {
					// console.log("Success!!!!!!!");
					const dtt = new Date().getTime();
					db.query('UPDATE connect_info SET ? WHERE ip = ?', [{remain_req : req_limit, expire_time : dtt + time_limit}, memberData.ip], function(err, result) {
						if(err) {
							console.log(err);
						}
					});
					diff = time_limit;
					rows[0].remain_req = req_limit;
				}
				// transform time format
				const res_min = Math.floor(diff / (60 * 1000));
				const res_sec = Math.floor( (diff - (res_min * 60000)) / 1000 );
				result.time = res_min + ":" + res_sec;
				result.remain_req = rows[0].remain_req;
				
				if (rows[0].remain_req == 0) {
					reject(result);
					return;
				}
				// UPDATE request time
				var up = rows[0].remain_req - 1;
				
				db.query('UPDATE connect_info SET ? WHERE ip = ?', [{remain_req: up}, memberData.ip], function(err, rows) {
					if(err) {
						console.log(err);
						return;
					}
				});
				result.remain_req = up;
				resolve(result);
			}
			else {
				db.query('INSERT INTO connect_info SET ?', memberData, function(err, rows) {
				if(err) {
					console.log(err);
					return;
				}
				
				result.time = "00:10";
				result.remain_req = req_limit;
				resolve(result);
				})
			}
		})
		
	})
}

