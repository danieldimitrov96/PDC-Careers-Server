class AuthController {
    constructor(data) {
        this.data = data;
    }
    async getUserByEmail(email) {
        return this.data.User.getByEmail(email);
    }

    async createUser(email, password) {
        return this.data.User.create({
            email,
            password,
            isAdmin: false,
        });
    }
}

module.exports = AuthController;
