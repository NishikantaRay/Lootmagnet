const { Pool } = require('pg');
const logger = require('../middleware/logger');
const config = require('./db.config');

const pool = new Pool(config);

pool.connect(async function(err,client,done) {
	if(err){
		logger.error(`Could not connect to databse ${err}`);
		done();
	}else{
		logger.info("Connected to database");
		try{
			await client.query("CREATE TABLE IF NOT EXISTS subscribers(phone INTEGER NOT NULL)");
			await client.query("CREATE TABLE IF NOT EXISTS ads(id UUID NOT NULL DEFAULT gen_random_uuid(),name STRING NOT NULL, email STRING NOT NULL, message STRING NOT NULL)");
			await client.query("CREATE TABLE IF NOT EXISTS verfied_ads(id UUID NOT NULL, name STRING NOT NULL, email STRING NOT NULL, message STRING NOT NULL)");
			// logger.info("All tables loaded succesfully");
		}catch(err){
			logger.error(`Unable to load tables ${err}`);
		}
	}
});

module.exports = pool;