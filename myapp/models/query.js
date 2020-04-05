const req_limit = 1000;
const time_limit = 1000 * 60 * 60;
const db = require('./connection_db');
const exp_time = "60:00";
module.exports = class Query {
    static check_database(ip) {
        return new Promise( (resolve, reject) => {
            db.query('SELECT * FROM connect_info WHERE ip = ?', ip, function(err, rows) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(rows);
                }
            });
    
        });
    }
    
    static create_data(memberData) {
        let result = {};
        return new Promise( (resolve, reject) => {
            db.query('INSERT INTO connect_info SET ?', memberData, function(err, rows) {
                if(err) {
                    reject(err);
                    return;
                }
                
                result.time = exp_time;
                result.remain_req = req_limit;
                resolve(result);
            });
    
        });
    }
    static update_time(ip) {
        const dtt = new Date().getTime();
        db.query('UPDATE connect_info SET ? WHERE ip = ?', [{remain_req : req_limit, expire_time : dtt + time_limit}, ip], function(err, result) {
            if(err) {
                console.log(err);
            }
        });
    }
    
    static update_req(req, ip) {
    
        db.query('UPDATE connect_info SET ? WHERE ip = ?', [{remain_req: req}, ip], function(err, rows) {
            if(err) {
                console.log(err);
                return;
            }
        });
    }
    
    static update_data(memberData, rows) {
    
        let result = {};
        const expire = parseInt(rows[0].expire_time, 10);
        const now = new Date().getTime();
       // console.log(rows);
        return new Promise((resolve, reject) => {
            var diff = expire - now;
        
            // judge time first
            if (diff < 0) {
                this.update_time(memberData.ip);
                diff = time_limit;
                rows[0].remain_req = req_limit;
            }
    
            const res_min = Math.floor(diff / (60 * 1000));
            const res_sec = Math.floor( (diff - (res_min * 60000)) / 1000 );
            result.time = res_min + ":" + res_sec;
            result.remain_req = rows[0].remain_req;
            if (rows[0].remain_req == 0) {
                result.status = 429;
            }
            else {
                const req = rows[0].remain_req - 1;
                this.update_req(req, memberData.ip);
                result.remain_req = req;
            }
            resolve(result);
        });
        
    }
}
