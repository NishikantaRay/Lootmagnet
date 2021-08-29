const express = require('express');
const app = express();
const cors = require('cors');
const { port } = require('./config/env.config');
const logger = require('./middleware/logger');
const db = require('./config/db.conn');
const subscriber = require('./routes/subscriber');
const advertiser = require('./routes/advertiser');
const corsOption = {
	"origin" : "*",
};

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/subscriber', subscriber);
app.use('/api/advertiser', advertiser);

app.listen(port, () => {
	logger.info(`Server started at port ${port}`);
});