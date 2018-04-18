const {
    User,
    JobAd,
    JobApplication,
    Contact,
} = require('../db/models');

const Data = require('./generic.data');
const ButtonsData = require('./buttons.data');

module.exports = {
    User: new Data(User),
    JobAd: new Data(JobAd),
    JobApplication: new Data(JobApplication),
    Contact: new Data(Contact),
    Button: new ButtonsData(),
};
