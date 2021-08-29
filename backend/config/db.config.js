const fs = require('fs');
const path = require('path');
const { dbUsername, dbPassword, dbHost, dbDatabase, dbPort, dbCertsFile } = require('./env.config');

const config = {
	user : dbUsername,
	password : dbPassword,
	host : dbHost,
	database : dbDatabase,
	port : dbPort,
	ssl : {
		ca : fs.readFileSync(path.join(__dirname, dbCertsFile)).toString(),
	}
};

module.exports = config;