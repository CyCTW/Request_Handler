const config = require('../config/development_config')
const mysql = require('mysql');

const connection = mysql.createConnection({
	host : config.mysql.host,
	user : config.mysql.user,
	password : config.mysql.password,
	database : config.mysql.database
});

connection.connect(err => {
	if(err)
		console.log('connecting error');
	else
		console.log('connection success');
	

});

connection.query("DELETE FROM connect_info", function(err, result){
	if(err)
		console.log(err);
	else
		console.log("clear table");
});
module.exports = connection;
