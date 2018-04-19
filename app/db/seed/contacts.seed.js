const seeder = require('mongoose-seed');
const connectionString = require('../config');

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/contact/Contact.js',
    ]);

    // seeder.clearModels(['Contact'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
// });

const data = [{
    'model': 'Contact',
    'documents': [{
        'name': 'gosho EOOD',
        'address': 'SOFIA',
        'isPrimary': true,
    },
    ],
}];