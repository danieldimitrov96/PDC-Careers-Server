const path = require('path');

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

    async editJob(id, content) {
        try {
            return await this.data.JobAd.findByIdAndUpdate(id, content);
        } catch (err) {
            return 'Error!';
        }
    }

    async createJob(content) {
        try {
            return await this.data.JobAd.create(content);
        } catch (err) {
            return 'Duplicates!';
        }
    }

    async deleteJob(id) {
        try {
            return await this.data.JobAd.findByIdAndRemove(id);
        } catch (err) {
            return 'Error!';
        }
    }
    
    async findApplicationByJobId(jobId) {
        try {
            const job = await this.data.JobAd.getById(jobId);
            const users = await Promise.all(job.usersApplied.map((user)=>{
                return this.data.User.getById(user.user);
            }));
            const infoAboutApplication = (
                await Promise.all(job.usersApplied.map((user) => {
                    return this.data.JobApplication.getById(user.application);
                })))
                .map(({
                    _id,
                    firstName,
                    lastName,
                    comment,
                    createdAt,
                    CV,
                    CoverLetter,
                }) =>
                ({
                    _id,
                    firstName,
                    lastName,
                    comment,
                    createdAt,
                    CV: path.basename(CV),
                    CoverLetter: path.basename(CoverLetter),
                }));
                infoAboutApplication.forEach((application, index = 0)=>{
                    infoAboutApplication[index].email = users[index].email;
                    index++;
                });
            return {
                context: infoAboutApplication,
                title: job.title,
            };
        } catch (error) {
            return 'Error!';
        }
    }
}

module.exports = AdminController;
