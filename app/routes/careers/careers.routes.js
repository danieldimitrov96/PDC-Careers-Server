const {
    Router,
} = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const Controller = require('./careers.controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage,
});

const uploadFields = upload.fields([{
        name: 'CV',
        maxCount: 1,
    },
    {
        name: 'CoverLetter',
        maxCount: 1,
    },
]);

const init = (app, data) => {
    const router = new Router();
    const controller = new Controller(data);
    router
        .get('/', async (req, res) => {
            const bearer = req.headers.authorization;
            if (bearer) {
                const token = bearer.split(' ')[1];
                const decoded = jwt.decode(token);
                if (decoded.isAdmin) {
                    const context = await controller.getAllJobsAndCategories();
                    res.json(context);
                } else {
                    const context =
                        await controller.getActiveJobsAndCategories();
                    res.json(context);
                }
            } else {
                const context = await controller.getActiveJobsAndCategories();
                res.json(context);
            }
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
        }), uploadFields, async (req, res) => {
            const cvFile = req.files.CV[0];
            let coverFile = req.files.CoverLetter;
            if (coverFile) {
                coverFile = req.files.CoverLetter[0];
            }
            const jobId = req.params.id;
            const userId = req.user._id;
            const formData = req.body;
            const newApplication =
                await controller.createApplication(jobId, userId, formData,
                    cvFile, coverFile);
            if (newApplication !== 'User has already applied!') {
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
