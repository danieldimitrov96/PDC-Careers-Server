const express = require('express');
const mongoose = require('mongoose');
const data = require('./data');

const config = require('./config');
const app = express();

const connectionString = config.URL;
mongoose.connect(connectionString);

require('./config/express').init(app);
require('./routes').init(app, data);

app.listen(config.PORT);

console.log(`Server is running on port ${config.PORT}`);
