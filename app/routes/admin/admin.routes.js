const {
    Router,
} = require('express');

const Controller = require('./admin.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            if (req.user && req.user.isAdmin) {
                const context = await controller.getAllUsers();
                res.status(200).send(context);
            } else {
                // const msg = { error: 'Not Found' };
                res.status(404).send();
            }
        })
        .get('/users', async (req, res) => {
            const {
                page = 0,
            } = req.query;
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
            const context = controller.getAllContacts();
            res.json(context);
            // logic to get all contacts
        })
        .post('/jobs', async (req, res) => {
            const content = req.body;
            // TO DO: create method in controller that creates new job
        })
        .post('/buttons', async (req, res) => {
            const content = req.body;
            const newButton = await controller.createButton(content);
            if (newButton !== 'Duplicate!') {
                res.json(newButton);
            } else {
                res.sendStatus(302);
            }
        })
        .post('/buttons/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const content = req.body;
            // console.log(id, content);
            const editedButton = await controller.editButton(content, id);
            if (editedButton !== 'Error!') {
                res.json(editedButton);
            } else {
                res.sendStatus(302);
            }
        })
        .post('/buttons/remove/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const removedButton = await controller.deleteButton(id);
            if (removedButton !== 'Error!') {
                res.json(removedButton);
            } else {
                res.sendStatus(302);
            }
        });

    app.use('/api/admin', router);
};

module.exports = {
    init,
};