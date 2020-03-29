const qy = require('./query')

module.exports = function register(memberData) {
	let result = {};
	return qy.check_database(memberData.ip).then((rows) => {
		if (rows.length >= 1) {
			return qy.update_data(memberData, rows).then( (values) => {
				return values;
			});
		}
		else {
			return qy.create_data(memberData).then( (values) => {
				return values;
			});
			
		}
	});
}

