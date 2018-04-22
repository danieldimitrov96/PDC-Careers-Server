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
            res.status(200).send({ context });
        });
    // .get('/test', passport.authenticate('jwt', {
    //     session: false
    // }), async (req, res) => {
    //     res.json({
    //         user: req.user,
    //     });
    // });
    app.use('/api/buttons', router);
};

module.exports = {
    init,
};
