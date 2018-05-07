const seeder = require('mongoose-seed');
const connectionString = require('./../../config').URL;

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/user/User.js',
    ]);

    seeder.clearModels(['User'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [{
        'model': 'User',
        'documents': [{
                'email': 'admin1@pdc.com',
                'password': '87654321',
                'isAdmin': true,
            },
            {
                'email': 'john_doe@pdc.com',
                'password': '12345678',
                'isAdmin': false,
            },
        ],
    },
];