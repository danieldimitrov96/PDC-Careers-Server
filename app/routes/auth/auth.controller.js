class AuthController {
    constructor(data) {
        this.data = data;
    }
    async getUserByEmail(email) {
        return this.data.User.getByEmail(email);
    }

    async createUser(email, password) {
        try {
            return await this.data.User.create({
                email,
                password,
                isAdmin: false,
            });
        } catch (error) {
            return 'Duplicate entries';
        }
    }
}

module.exports = AuthController;
