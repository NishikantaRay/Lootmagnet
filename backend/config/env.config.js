const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port : process.env.PORT,
	logFile : process.env.LOG_FILE,
	dbUsername : process.env.DB_USERNAME,
	dbHost : process.env.DB_HOST,
	dbPassword : process.env.DB_PASSWORD,
	dbPort : process.env.DB_PORT,
	dbDatabase : process.env.DB_DATABASE,
	dbCertsFile : process.env.DB_CERTS_FILE,
	twilioAccountSid : process.env.TWILIO_ACCOUNT_SID,
	twilioAuthToken : process.env.TWILIO_AUTH_TOKEN,
	twilioMessagingServiceId : process.env.TWILIO_MESSAGING_SERVICE_ID,
};