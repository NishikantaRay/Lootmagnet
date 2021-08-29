const { createLogger, transports, format } = require("winston");
const { combine, timestamp, json, printf } = format;
const { logFile } = require("../config/env.config");

const myFormat = printf(({ level, message, timestamp }) => {
	const ts = new Date(timestamp).toLocaleString();
	return `${ts} [${level}]: ${message}`;
});

const logger = createLogger({
	level: 'debug',
	format: combine(timestamp(), json(), myFormat),
	transports: [
		new transports.Console(),
		// new transports.File({ filename: logFile }),
	],
});

module.exports = logger;
