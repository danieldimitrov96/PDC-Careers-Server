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

    async getJobById(job) {
        return await this.data.JobAd.getById(job);
    }
    // !!!!!!!!!MUST BE TESTED WITH CLIENT!!!!!!!!
    async createApplication(jobId, userId, userData) {
        console.log(userData);
        const [user, job] =
        await Promise.all([this.data.User.getById(userId),
            this.data.JobAd.getById(jobId),
        ]);
        console.log(user);
        console.log('======================');
        console.log(job);
        await this.data.JobApplication.createApplication(user, job, userData);
    }
}

module.exports = CareersController;
