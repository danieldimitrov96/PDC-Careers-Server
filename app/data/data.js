const {
    JobCategory,
} = require('../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');
const ButtonsData = require('./buttons.data');
const JobAdsData = require('./jobads.data');
const JobAppsData = require('./jobapps.data');
const ContactsData = require('./contacts.data');

module.exports = {
    User: new UsersData(),
    JobAd: new JobAdsData(),
    JobApplication: new JobAppsData(),
    JobCategory: new Data(JobCategory),
    Contact: new ContactsData(),
    Button: new ButtonsData(),
};
