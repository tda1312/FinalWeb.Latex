var mysql = require('mysql')

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Popnap_1',
	database : 'nodelogin'
});


module.exports = connection