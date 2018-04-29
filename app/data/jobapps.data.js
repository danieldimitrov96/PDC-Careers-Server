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
        // console.log('USERDATA', userData);
        // console.log('jobId', job._id);
        // console.log('JOB', job);
        const application = await this.Model.create(userData);
        // console.log('APPLICATION', application);
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
