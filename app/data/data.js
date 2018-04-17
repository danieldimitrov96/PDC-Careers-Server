const {
    User,
    JobAd,
    JobApplication,
    Contact,
    Button,
} = require('../db/models');

const Data = require('./generic.data');

module.exports = {
    User: new Data(User),
    JobAd: new Data(JobAd),
    JobApplication: new Data(JobApplication),
    Contact: new Data(Contact),
    Button: new Data(Button),
};
