const Data = require('./generic.data');
const {
    JobApplication,
} = require('../db/models');

class JobAppsData extends Data {
    constructor() {
        super(JobApplication);
    }

    async createApplication(user, job, formData) {
        formData.user = user._id;
        formData.job = job._id;
        const application = await this.Model.create(formData);
        job.usersApplied.push({
            user,
            application,
        });
        user.appliedJobs.push({
            job,
            application,
        });
        job.save();
        user.save();
        return application;
    }
}

module.exports = JobAppsData;
