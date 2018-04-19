const {
    Router,
} = require('express');

const Controller = require('./contacts.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            const [all, firstPrimary] =
            await Promise.all([controller.getAllContacts(),
                controller.getFirstPrimaryContact(),
            ]);
            res.json({
                all,
                firstPrimary,
            });
        });
    app.use('/contacts', router);
};

module.exports = {
    init,
};
