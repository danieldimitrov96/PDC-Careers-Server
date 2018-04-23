const seeder = require('mongoose-seed');
const connectionString = require('./../../config').URL;

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/button/Button.js',
    ]);

    seeder.clearModels(['Button'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [{
    'model': 'Button',
    'documents': [{
            'name': 'YouTube',
            'link': 'http://youtube.com',
            'icon': 'path/to/icon',
            'type': 'Action',
            'hidden': false,
        },
        {
            'name': 'LinkedIn',
            'link': 'http://linkedin.com',
            'icon': 'path/to/icon',
            'type': 'Social',
            'hidden': false,
        },
        {
            'name': 'Forbes',
            'link': 'http://forbes.com',
            'icon': 'path/to/icon',
            'type': 'Action',
            'hidden': true,
        },
    ],
}];