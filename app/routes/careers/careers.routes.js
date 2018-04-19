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
            res.json(context);
        })
        .get('/:id', async (req, res) => {
            const { id }= req.params;
            const context = await controller.getJobById(id);
            res.json(context);
        });
    app.use('/api/careers', router);
};

module.exports = {
    init,
};
