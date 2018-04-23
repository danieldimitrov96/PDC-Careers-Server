const seeder = require('mongoose-seed');
const connectionString = require('./../../config').URL;

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/contact/Contact.js',
    ]);

    seeder.clearModels(['Contact'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [{
    'model': 'Contact',
    'documents': [{
        'name': 'gosho EOOD',
        'address': 'pirotska SOFIA',
        'isPrimary': false,
    },
    {
        'name': 'tosho EOOD',
        'address': 'SOFIA',
        'isPrimary': false,
    },
    {
        'name': 'pesho EOOD',
        'address': 'sevastopol varna',
        'isPrimary': true,
    },
    {
        'name': 'ivan EOOD',
        'address': 'ndk SOFIA',
        'isPrimary': true,
    },
    ],
}];