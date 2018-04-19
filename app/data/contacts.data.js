const Data = require('./generic.data');
const {
    Contact,
} = require('../db/models');

class ContactsData extends Data {
    constructor() {
        super(Contact);
    }

    getAllPrimaryContacts() {
        return this.Model.find({ isPrimary: true });
    }
}

module.exports = ContactsData;

