const Data = require('./generic.data');

const {
    User,
} = require('../db/models');

class UsersData extends Data {
    constructor() {
        super(User);
    }
}
