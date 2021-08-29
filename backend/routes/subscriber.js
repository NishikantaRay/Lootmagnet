const express = require('express');
const router = express.Router();
const subscriber = require('../controllers/subscriber.controller');

router.post("/subscribe", subscriber.subscribe);

module.exports = router;