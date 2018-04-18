const Data = require('./generic.data');
const {
    JobAd,
} = require('../db/models');

class JobAdsData extends Data {
    constructor() {
        super(JobAd);
    }

    getAllActiveJobs() {
        return this.Model.find( { status: 'Active' });
    }
}
module.exports = JobAdsData;
