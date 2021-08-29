const pool = require("../config/db.conn");
const { twilioAccountSid, twilioAuthToken, twilioMessagingServiceId } = require("../config/env.config");
const logger = require("../middleware/logger");
const accountSid = twilioAccountSid;
const authToken = twilioAuthToken;
const client = require("twilio")(accountSid, authToken);

exports.getAds = async (req, res) => {
	try {
		let ads = await pool.query("SELECT * FROM ads");
		res.status(200).json({
			message: "Ads fetched successfully",
			ads : ads.rows
		});
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error fetching ads"
		});
	}
};

exports.sendAds = async (req, res) => {
	try {
		await pool.query("INSERT INTO ads(name, email, message) VALUES($1, $2, $3)", [req.body.name, req.body.email, req.body.message]);
		res.status(200).json({
			message: "Ad added successfully"
		});
		logger.info(`Ad by ${req.body.email} added successfully`);
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error adding ad"
		});
	}
};

exports.verifyAds = async (req, res) => {
	try {
		let adId = req.params.id;
		let ad = await pool.query("SELECT * FROM ads WHERE id = $1", [adId]);
		await pool.query("DELETE FROM ads WHERE id = $1", [adId]);
		await pool.query("INSERT INTO verfied_ads VALUES($1, $2, $3,$4)", [ad.rows[0].id, ad.rows[0].name, ad.rows[0].email, ad.rows[0].message]);
		res.status(200).json({
			message: "Ad verified successfully"
		});
		logger.info(`Ad ${ad.rows[0].id} verified successfully`);	
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error verifying ad"
		});
	}
};

exports.getVerifiedAds = async (req, res) => {
	try {
		let verfiedAds = await pool.query("SELECT * FROM verfied_ads");
		res.status(200).json({
			message: "Verified ads fetched successfully",
			ads : verfiedAds.rows
		});
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error fetching verfied ads"
		});
	}
};

exports.sendMessages = async (req, res) => {
	console.log("At message sending");
	try {
		let phoneNumbers = await pool.query("SELECT phone FROM subscribers");
		for (let i = 0; i < phoneNumbers.rows.length; i++) {
			client.messages.create({
				messagingServiceSid: twilioMessagingServiceId,
				to: '+'+phoneNumbers.rows[i].phone,
				body: '\nGreat hot deals are here! Grab it right now.\nLink - http://localhost:4200/adlist'
			})
			.then(message => logger.info(`${message.sid} is sent`));
		}
		res.status(200).json({
			message : "Messages sent"
		})
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error sending messages"
		});
	}
};

exports.deleteAd = async (req, res) => {
	try {
		await pool.query("DELETE FROM ads WHERE id = $1", [req.params.id]);
		res.status(200).json({
			message: "Ad deleted successfully"
		});
		logger.info(`Ad ${req.params.id} deleted successfully`);
	} catch (error) {
		logger.error(error);
		res.status(400).json({
			message: "Error deleting ad"
		});
	}
};