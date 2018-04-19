class ButtonController {
    constructor(data) {
        this.data = data;
    }

    async getActionSocialButtons() {
        return await this.data.Button.getButtonsForHomePage();
    }
}

module.exports = ButtonController;
