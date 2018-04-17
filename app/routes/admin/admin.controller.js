class AdminController {
    constructor(data) {
        this.data = data;
    }

    async getAllUsers() {
        let allUsers = await this.data.User.getAll();
        if (allUsers.length !== 0) {
            allUsers = allUsers
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((user) => {
                const totalApps = user.appliedJobs.length / 2;
                return {
                    id: user._id,
                    email: user.email,
                    createdAt: user.createdAt,
                    totalApplications: totalApps,
                };
            });
            return allUsers;
        }
        return 'No data available';
    }

    async getAllJobAds() {
        return await this.data.JobAd.getAll();
    }
}

module.exports = AdminController;
