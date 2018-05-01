class AdminController {
    constructor(data) {
        this.data = data;
    }
    // TO DO: fix methods to work with pages
    async getAllUsers() {
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
    async getAllCategories() {
        const allCategories = await this.data.JobCategory.getAll();
        return allCategories.map(
            ({
                _id,
                type,
            }) => ({
                id: _id,
                type,
            })
        );
    }
    async getAllJobAds() {
        const allJobs = await this.data.JobAd.getAll();
        return allJobs.map(
            ({
                _id,
                title,
                status,
                createdAt,
            }) => ({
                id: _id,
                title,
                status,
                createdAt,
            })
        );
    }

    async getJobById(id) {
        return this.data.JobAd.getById(id);
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

    async editButton(content, id) {
        try {
            return await this.data.Button.findByIdAndUpdate(id, content);
        } catch (error) {
            return 'Error!';
        }
    }

    async deleteButton(id) {
        try {
            return await this.data.Button.findByIdAndRemove(id);
        } catch (error) {
            return 'Error!';
        }
    }

    async createContact(obj) {
        try {
            return await this.data.Contact.create(obj);
        } catch (error) {
            return 'Duplicate!';
        }
    }

    async editContact(content, id) {
        try {
            return await this.data.Contact.findByIdAndUpdate(id, content);
        } catch (error) {
            return 'Error!';
        }
    }

    async deleteContact(id) {
        try {
            return await this.data.Contact.findByIdAndRemove(id);
        } catch (error) {
            return 'Error!';
        }
    }
}

module.exports = AdminController;
