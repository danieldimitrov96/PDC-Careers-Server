class AdminController {
    constructor(data) {
        this.data = data;
    }
    // TO DO: fix methods to work with pages
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
        const allJobs = await this.data.JobAd.getAll();
        return allJobs.map(
            ({ _id, title, createdAt }) => ({ id: _id, title, createdAt })
        );
    }

    async getAllButtons() {
        return await this.data.Button.getAll();
    }

    async getAllContacts() {
        return await this.data.Contact.getAll();
    }

    async createButton(obj) {
        try {
            return await this.data.Button.create(obj);
        } catch (error) {
            return 'Duplicate!';
        }
    }
}

module.exports = AdminController;
