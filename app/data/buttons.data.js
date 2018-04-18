const Data = require('./generic.data');
const {
    Button,
} = require('../db/models');

class ButtonsData extends Data {
    constructor() {
        super(Button);
    }

    getButtonsForHomePage() {
        return this.Model.find({ hidden: false });
    }
}

module.exports = ButtonsData;

