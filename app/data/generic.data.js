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

    create(obj) {
        return this.Model.create(obj);
    }
}

module.exports = Data;
