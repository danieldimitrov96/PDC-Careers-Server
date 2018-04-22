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
        })
        .post('/:id', async (req, res) => {
            // check if user is logged in
            const jobId = req.params.id;
            const userId = req.user._id;
            const userData = req.body;
            // add user who applied for this job
            await controller.createApplication(jobId, userId, userData);
        });
    app.use('/api/careers', router);
};

module.exports = {
    init,
};
