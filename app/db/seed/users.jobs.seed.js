const seeder = require('mongoose-seed');
const connectionString = require('../config');

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/user/User.js',
        'app/db//models/jobad/JobAd.js',
    ]);

    seeder.clearModels(['User', 'JobAd'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [{
        'model': 'User',
        'documents': [{
                'email': 'admin1@test.com',
                'password': '123',
                'isAdmin': true,
            },
            {
                'email': 'PAVEL_DENEV@test.com',
                'password': '123',
                'isAdmin': false,
            },
            {
                'email': 'drUg_usEr@test.com',
                'password': '123',
                'isAdmin': false,
            },
        ],
    },
    {
        'model': 'JobAd',
        'documents': [{
                'title': 'Junior Developer',
                'description': 'This is a test IT job',
                'category': 'IT',
                'status': 'Active',
            },
            {
                'title': 'Sales consultant',
                'description': 'This is a test Sales job',
                'category': 'Sales',
                'status': 'Active',
            },
            {
                'title': 'Marketing Director',
                'description': 'This is a test Marketing job',
                'category': 'Marketing',
                'status': 'Inactive',
            },
        ],
    }
];