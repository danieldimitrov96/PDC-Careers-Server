const express = require('express');
const data = require('./data');

const config = require('./config');
const app = express();

require('./config/express').init(app);
// require('./config/auth').init(app);

const attachUserToRes = (req, res, next) => {
    res.locals.user = req.user || null;
    return next();
};

app.use(attachUserToRes);

require('./routes').init(app, data);

app.listen(config.port);

console.log(`Server is running on port ${config.port}`);
