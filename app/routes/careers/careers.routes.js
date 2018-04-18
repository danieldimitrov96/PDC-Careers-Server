const {
    Router,
} = require('express');

const Controller = require('./careers.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            const context = await controller.getActiveJobsAndCategories();
            res.status(200).send(context);
        });
    app.use('/careers', router);
};

module.exports = {
    init,
};
