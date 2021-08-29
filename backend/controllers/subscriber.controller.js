const pool = require("../config/db.conn");
const logger = require("../middleware/logger")

exports.subscribe = async (req, res) => {
	try{
		let userExist = await pool.query("SELECT phone FROM subscribers WHERE phone = $1", [req.body.phone]);
		if(userExist.rows.length > 0){
			res.status(200).json({
				message : "User already exist"
			});
		} else{
			await pool.query("INSERT INTO subscribers(phone) VALUES($1)", [req.body.phone]);
			res.status(200).json({
				message : "User added"
			});
			logger.info(`User ${req.body.phone} added`);
		}
	} catch(err) {
		logger.error(err);
		res.status(400).json({
			message : "Error while adding user",
			error : err
		});
	}
}