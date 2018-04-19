class CareersController {
    constructor(data) {
        this.data = data;
    }
    async getActiveJobsAndCategories() {
        let allJobs = await this.data.JobAd.getAllActiveJobs();
        const allCategories = await this.data.JobCategory.getAll();
        if (allJobs.length !== 0) {
            allJobs = allJobs
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((job) => {
                    return {
                        id: job._id,
                        title: job.title,
                        description: job.description,
                        createdAt: job.createdAt,
                    };
                });
            return {
                allJobs,
                allCategories,
            };
        }
        return null;
    }

    async getJobById(job) {
        return await this.data.JobAd.getById(job);
    }
}

module.exports = CareersController;
