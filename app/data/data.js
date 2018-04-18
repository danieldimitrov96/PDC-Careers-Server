const {
    User,
    JobAd,
    JobCategory,
    JobApplication,
    Contact,
} = require('../db/models');

const Data = require('./generic.data');
const ButtonsData = require('./buttons.data');
const JobAdsData = require('./jobads.data');

module.exports = {
    User: new Data(User),
    JobAd: new JobAdsData(),
    JobApplication: new Data(JobApplication),
    JobCategory: new Data(JobCategory),
    Contact: new Data(Contact),
    Button: new ButtonsData(),
};
