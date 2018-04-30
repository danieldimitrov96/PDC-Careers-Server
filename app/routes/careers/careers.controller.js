/* globals __dirname */
const path = require('path');

class CareersController {
    constructor(data) {
        this.data = data;
    }
    // TO DO: fix to work with pages
    async getActiveJobsAndCategories() {
        const [allJobs, allCategoriesDb] = await Promise.all([
            this.data.JobAd.getAllActiveJobs(),
            this.data.JobCategory.getAll(),
        ]);

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

    async getJobById(jobId) {
        return await this.data.JobAd.getById(jobId);
    }
    async createApplication(jobId, userId, formData, cvFile, coverFile) {
        const CV = path.join(__dirname, '..',
            '..', '..', 'uploads', cvFile.filename);

        const CoverLetter = path.join(__dirname, '..',
            '..', '..', 'uploads', coverFile.filename);

        formData.CV = CV;
        formData.CoverLetter = CoverLetter;
        const [user, job] =
        await Promise.all([this.data.User.getById(userId),
            this.data.JobAd.getById(jobId),
        ]);
        return this.data.JobApplication.createApplication(user, job, formData);
    }
}

module.exports = CareersController;
