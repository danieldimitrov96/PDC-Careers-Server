const {
    User,
    JobCategory,
    JobApplication,
} = require('../db/models');

const Data = require('./generic.data');
const ButtonsData = require('./buttons.data');
const JobAdsData = require('./jobads.data');
const ContactsData = require('./contacts.data');

module.exports = {
    User: new Data(User),
    JobAd: new JobAdsData(),
    JobApplication: new Data(JobApplication),
    JobCategory: new Data(JobCategory),
    Contact: new ContactsData(),
    Button: new ButtonsData(),
};
