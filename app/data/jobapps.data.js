const Data = require('./generic.data');
const {
    JobApplication,
} = require('../db/models');

class JobAppsData extends Data {
    constructor() {
        super(JobApplication);
    }

    async createApplication(user, job, userData) {
        userData.user = user._id;
        userData.job = job._id;
        const application = await this.Model.create(userData);

        job.usersApplied.push({
            user,
            application,
        });
        user.appliedJobs.push({
            job,
            application,
        });

        return Promise.all([
            job.save(),
            user.save(),
        ]);
    }
}

module.exports = JobAppsData;
