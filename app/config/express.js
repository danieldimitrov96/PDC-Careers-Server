/* globals __dirname */

const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const morgan = require('morgan');

const init = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static(path.join(__dirname, '../public')));
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
