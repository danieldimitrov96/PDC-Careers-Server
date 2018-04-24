const seeder = require('mongoose-seed');
const connectionString = require('./../../config').URL;

seeder.connect(connectionString, function () {
    seeder.loadModels([
        'app/db//models/jobcategory/JobCategory.js',
    ]);

    seeder.clearModels(['JobCategory'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});

const data = [{
    'model': 'JobCategory',
    'documents': [{
            'type': 'IT',
        },
        {
            'type': 'Marketing',
        }, {
            'type': 'Sales',
        }, {
            'type': 'Operations',
        }, {
            'type': 'Other',
        },
    ],
}];