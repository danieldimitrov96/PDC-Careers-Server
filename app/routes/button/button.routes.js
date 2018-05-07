const {
    Router,
} = require('express');
const passport = require('passport');

const Controller = require('./button.controller');
const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            const context = await controller.getActionSocialButtons();
            res.json(context);
        });
    app.use('/api/buttons', router);
};

module.exports = {
    init,
};
