/* globals __dirname */

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const auth = require('./auth');
const cors = require('cors');

const init = (app) => {
    auth.init(app);
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
