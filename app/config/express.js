/* globals __dirname */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const init = (app) => {
    if (typeof app.use !== 'function' ||
        typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan('combined'));
};

module.exports = {
    init,
};
