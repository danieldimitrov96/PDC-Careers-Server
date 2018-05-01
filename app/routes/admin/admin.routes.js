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
            const context = await controller.getAllUsers();
            res.status(200).send(context);
        })
        .get('/categories', async (req, res) => {
            const context = await controller.getAllCategories();
            res.json(context);
        })
        .get('/jobs', async (req, res) => {
            const context = await controller.getAllJobAds();
            res.json(context);
        })
        .get('/jobs/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            if (id !== 'create') {
                const context = await controller.getJobById(id);
                res.json(context);
            } else {
                res.status(200);
            }
        })
        .get('/buttons', async (req, res) => {
            const context = await controller.getAllButtons();
            res.status(200).send(context);
        })
        .get('/contacts', async (req, res) => {
            const context = await controller.getAllContacts();
            res.json(context);
        })
        .post('/contacts', async (req, res) => {
            const content = req.body;
            const newButton = await controller.createContact(content);
            if (newButton !== 'Duplicate!') {
                res.json(newButton);
            } else {
                res.sendStatus(302);
            }
        })
        .post('/contacts/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const content = req.body;
            const editedContact = await controller.editContact(content, id);
            if (editedContact !== 'Error!') {
                res.json('Button is edited!');
            } else {
                res.sendStatus(302);
            }
        })
        .post('/contacts/remove/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const removedContact = await controller.deleteContact(id);
            if (removedContact !== 'Error!') {
                res.json('Button is removed!');
            } else {
                res.sendStatus(302);
            }
        })
        .post('/jobs/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const content = req.body;
            if (id !== 'create') {
                const editedJob = await controller.editJob(id, content);
                if (editedJob !== 'Error!') {
                    res.json(editedJob);
                } else {
                    res.sendStatus(403);
                }
            } else {
                const newJob = await controller.createJob(content);
                if (newJob !== 'Duplicates!') {
                    res.status(201).json(newJob);
                } else {
                    res.sendStatus(302);
                }
            }
        })
        .post('/jobs/remove/:id', async (req, res) => {
            const {
                id,
            } = req.params;
            const deletedJob = await controller.deleteJob(id);
            if (deletedJob !== 'Error!') {
                console.log('DELETED');
                res.json(deletedJob);
            } else {
                console.log('ERROR!');
                res.sendStatus(403);
            }
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
            const editedButton = await controller.editButton(content, id);
            if (editedButton !== 'Error!') {
                res.json('Button is edited!');
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
                res.json('Button is removed!');
            } else {
                res.sendStatus(302);
            }
        });

    app.use('/api/admin', router);
};

module.exports = {
    init,
};
