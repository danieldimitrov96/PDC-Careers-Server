const {
    Router,
} = require('express');

const Controller = require('./button.controller');
const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            const context = await controller.getActionSocialButtons();
            const text = require('../../config/app.settings.json').text;
            // TO DO: get twitter/facebook from app.settings.json;
            res.status(200).send({ context, text });
        });
    app.use('/buttons', router);
};

module.exports = {
    init,
};
