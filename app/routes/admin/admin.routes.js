const {
    Router,
} = require('express');

const Controller = require('./admin.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            // if (req.user && req.user.isAdmin) {
            //     const context = await controller.getAllUsers();
            //     res.status(200).send(context);
            // } else {
            //     res.redirect('/');
            // }
        })
        .get('/users', async (req, res) => {
            const page = req.query.page;

            if (!page) {
                page = 0;
            }
            const context = await controller.getAllUsers(page);
            res.status(200).send(context);
        })
        .get('/jobs', async (req, res) => {
            const context = await controller.getAllJobAds();
            res.status(200).send(context);
            // logic to get all active and inactive job ads
        })
        .get('/jobs/:id', async (req, res) => {
            // logic to get specific job by id
        })
        .get('/buttons', async (req, res) => {
            // logic to get all buttons(links)
            const context = await controller.getAllButtons();
            res.status(200).send(context);
        })
        .get('/contacts', async (req, res) => {
            // logic to get all contacts
        });


    app.use('/admin', router);
};

module.exports = {
    init,
};
