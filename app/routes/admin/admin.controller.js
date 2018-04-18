class AdminController {
    constructor(data) {
        this.data = data;
    }

    async getAllUsers(page) {
        let allUsers = await this.data.User.getAll();
        if (allUsers.length !== 0) {
            allUsers = allUsers
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((user) => {
                const totalApps = user.appliedJobs.length;
                return {
                    id: user._id,
                    email: user.email,
                    createdAt: user.createdAt,
                    totalApplications: totalApps,
                };
            });
            return allUsers;
        }
        return null;
    }

    async getAllJobAds() {
        let allJobs = await this.data.JobAd.getAll();
        if (allJobs.length !== 0) {
            allJobs = allJobs.map((job) => {
                return {
                    id: job._id,
                    title: job.title,
                    createdAt: job.createdAt,
                };
            });
            return allJobs;
        }
        return null;
    }

    async getAllButtons() {
        return await this.data.Button.getAll();
    }
}

module.exports = AdminController;
