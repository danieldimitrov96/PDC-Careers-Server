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
}

module.exports = Data;
