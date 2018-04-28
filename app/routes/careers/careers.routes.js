const {
    Router,
} = require('express');
const passport = require('passport');
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
            const {
                id,
            } = req.params;
            const context = await controller.getJobById(id);
            res.json(context);
        })
        .post('/:id', passport.authenticate('jwt', {
            session: false,
        }), async (req, res) => {
            // check if user is logged in
            // console.log('we are in');
            const jobId = req.params.id;
            // console.log(jobId);
            // console.log('='.repeat(30));
            const userId = req.user._id;
            const userData = req.body;
            // console.log(userId);
            // console.log(userData);
            // add user who applied for this job
            const newApplication =
            await controller.createApplication(jobId, userId, userData);
            if (newApplication) {
                res.json(newApplication);
            } else {
                res.sendStatus(403);
            }
        });
    app.use('/api/careers', router);
};

module.exports = {
    init,
};