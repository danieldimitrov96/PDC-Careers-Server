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
        'name': 'HQ',
        'address': 'Aleksandar Malinov 31, Sofia',
        'isPrimary': true,
    },
    {
        'name': 'Business Center',
        'address': 'Boulevard Tsarigradsko Shose 90',
        'isPrimary': false,
    },
    {
        'name': 'Events Hall',
        'address': 'NDK SOFIA',
        'isPrimary': false,
    },
    {
        'name': 'New York Sales',
        'address': '5th Avenue, New York, USA',
        'isPrimary': false,
    },
    ],
}];