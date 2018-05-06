/* globals __dirname */
const path = require('path');

class CareersController {
    constructor(data) {
        this.data = data;
    }
    async getAllJobsAndCategories() {
        const [allJobs, allCategoriesDb] = await Promise.all([
            this.data.JobAd.getAll(),
            this.data.JobCategory.getAll(),
        ]);

        return this._modifyJobsAndCategories(allJobs, allCategoriesDb);
    }
    async getActiveJobsAndCategories() {
        const [allJobs, allCategoriesDb] = await Promise.all([
            this.data.JobAd.getAllActiveJobs(),
            this.data.JobCategory.getAll(),
        ]);
        return this._modifyJobsAndCategories(allJobs, allCategoriesDb);
    }

    async getJobById(jobId) {
        return await this.data.JobAd.getById(jobId);
    }
    async createApplication(jobId, userId, formData, cvFile, coverFile) {
        let hasApplied = false;
        const CV = path.join(__dirname, '..',
            '..', '..', 'uploads', cvFile.filename);
        if (coverFile) {
            const CoverLetter = path.join(__dirname, '..',
            '..', '..', 'uploads', coverFile.filename);

            formData.CoverLetter = CoverLetter;
        }
        formData.CV = CV;
        const [user, job] =
        await Promise.all([this.data.User.getById(userId),
            this.data.JobAd.getById(jobId),
        ]);
        user.appliedJobs.forEach((application) => {
            if (application.job.toString() === jobId) {
                hasApplied = true;
            }
        });
        if (hasApplied) {
            return 'User has already applied!';
        }
        return this.data.JobApplication.createApplication(user, job, formData);
    }

    _modifyJobsAndCategories(allJobs, allCategoriesDb) {
        const allJobsAscending = allJobs.map(({
            _id,
            title,
            description,
            category,
            createdAt,
        }) => ({
            id: _id,
            title,
            description,
            category,
            createdAt,
        })).sort((x, y) => x.createdAt > y.createdAt);

        const allCategories = allCategoriesDb.map(({
            _id,
            type,
            jobs,
            createdAt,
        }) => ({
            id: _id,
            type,
            jobs,
            createdAt,
        }));

        return {
            allJobsAscending,
            allCategories,
        };
    }
}

module.exports = CareersController;
