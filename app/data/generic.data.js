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

    findByIdAndUpdate(id, obj) {
        return this.Model.findByIdAndUpdate(id, obj);
    }
}

module.exports = Data;
