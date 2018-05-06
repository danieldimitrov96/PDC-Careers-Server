/* globals __dirname */

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const auth = require('./auth');
const cors = require('cors');

const init = (app) => {
    auth.init(app);
    app.use(cors());
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods',
                    'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers',
                    'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true,
    }));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
