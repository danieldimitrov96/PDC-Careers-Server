const {
    Router,
} = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth');
const Controller = require('./auth.controller');
const secretOrKey = authConfig.options.secretOrkey;

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .post('/login', async (req, res) => {
            const { email } = req.body || null;
            const { password } = req.body || null;
            const user = await controller.getUserByEmail(email);
            if (!user) {
                res.status(403).json({ message: 'Invalid email or password' });
            } else if ((await user.comparePassword(password))) {
                const payload = { id: user._id };
                const token = jwt.sign(payload, secretOrKey);
                res.json({ message: 'ok', token, isAdmin: user.isAdmin });
            } else {
                res.status(403).json({ message: 'Invalid email or password' });
            }
        })
        .post('/signup', async (req, res) => {
            const { email } = req.body || null;
            const { password } = req.body || null;
            if (email && password) {
                const newUser = await controller.createUser(email, password);
                if (typeof newUser !== 'string') {
                    res.status(200).json({ message: 'User created' });
                } else {
                    res.status(409).json({ message: 'User already exists' });
                }
            } else {
                console.log('we are in');
                res.status(204).json({ message: 'No content' });
            }
        });
    app.use('/api', router);
};

module.exports = {
    init,
};
