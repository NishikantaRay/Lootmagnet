const express = require('express');
const { sendAds, getAds, verifyAds, getVerifiedAds, sendMessages, deleteAd } = require('../controllers/advertiser.controller');
const router = express.Router();

router.post("/sendAds", sendAds);

router.get("/getAds", getAds);

router.get("/verifyAds/:id", verifyAds);

router.get("/getVerfiedAds", getVerifiedAds);

router.get("/sendMessages", sendMessages);

router.delete("/deleteAd/:id", deleteAd);

module.exports = router;