class Data {
    constructor(Model) {
        this.Model = Model;
    }

    getAll() {
        return this.Model.find();
    }

    getById(id) {
        return this.Model.findById(id);
    }

    async create(obj) {
        try {
            return await this.Model.create(obj);
        } catch (error) {
            return 'Duplicate entries!';
        }
    }
}

module.exports = Data;
