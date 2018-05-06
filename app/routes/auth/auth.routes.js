const {
    Router,
} = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config');
const secretOrKey = authConfig.JWT_SECRET;
const expiresIn = authConfig.JWT_EXPIRE_TIME;
const Controller = require('./auth.controller');


const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .post('/login', async (req, res) => {
            const { email } = req.body || null;
            const { password } = req.body || null;
            const user = await controller.getUserByEmail(email);
            if (!user) {
                res.sendStatus(401);
            } else if ((await user.comparePassword(password))) {
                const payload = {
                    id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                };
                const token = jwt.sign(payload, secretOrKey, { expiresIn });
                res.json({ token, expiresIn, isAdmin: user.isAdmin });
            } else {
                res.sendStatus(401);
            }
        })
        .post('/signup', async (req, res) => {
            const { email } = req.body || null;
            const { password } = req.body || null;
            if (email && password) {
                const newUser = await controller.createUser(email, password);
                if (typeof newUser !== 'string') {
                    const payload = {
                        id: newUser._id,
                        email: newUser.email,
                        isAdmin: newUser.isAdmin,
                    };
                    const token = jwt.sign(payload, secretOrKey, { expiresIn });
                    res.json({ token, expiresIn, isAdmin: newUser.isAdmin });
                } else {
                    res.status(302).send({ message: 'User already exist!' });
                }
            } else {
                res.json({ message: 'No content' });
            }
        });
    app.use('/api', router);
};

module.exports = {
    init,
};
