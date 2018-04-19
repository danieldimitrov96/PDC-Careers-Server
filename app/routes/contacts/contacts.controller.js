class ContactsController {
    constructor(data) {
        this.data = data;
    }
    async getFirstPrimaryContact() {
        const primaryContacts = await this.data.Contact.getAllPrimaryContacts();
        primaryContacts
        // accending order
            .sort((a, b) => a.createdAt - b.createdAt);
        return primaryContacts[0];
    }

    async getAllContacts() {
        return await this.data.Contact.getAll();
    }
}

module.exports = ContactsController;
