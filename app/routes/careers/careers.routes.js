const {
    Router,
} = require('express');
const passport = require('passport');
const Controller = require('./careers.controller');
const multer = require('multer');
// set the directory for the uploads to the uploaded to
const DIR = './../../../../PDC-Uploads/';

const upload = multer({
    dest: DIR,
}).any();
/* GET home page. */
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
            upload(req, res, function(err) {
                let path = '';
                if (err) {
                    console.log('REQ FILE ERROR');
                    console.log(req.files);
                    // An error occurred when uploading
                    console.log(err);
                    // return res.status(422).send("an Error occured")
                }
                console.log('REQ FILE SUCCESS');

                // No error occured.
                console.log(req.files);

                path = req.files.path;
                // return res.send("Upload Completed for " + path);
            });
            console.log('-=-=-=-=--=-=');
            console.log(req.files);
            const userData = req.body;
            userData.CV = req.files[0];
            userData.CoverLetter = req.files[1];
            // console.log(userData);
            // check if user is logged in
            // console.log('we are in');
            const jobId = req.params.id;
            const userId = req.user._id;

            // console.log(jobId);
            // console.log(userId);
            // console.log('='.repeat(30));

            // userData.CV = req.file

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
