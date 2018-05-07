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
            'icon': 'youtube',
            'type': 'Action',
            'hidden': false,
        },
        {
            'name': 'Forbes',
            'link': 'http://forbes.com',
            'icon': 'forbes',
            'type': 'Action',
            'hidden': false,
        },
        {
            'name': 'LinkedIn',
            'link': 'https://www.linkedin.com/in/paveldpetrov/',
            'icon': 'linkedin',
            'type': 'Social',
            'hidden': false,
        },
        {
            'name': 'Campus X',
            'link': 'https://www.campusx.company/',
            'icon': 'campusx',
            'type': 'Action',
            'hidden': false,
        },
        {
            'name': 'Google',
            'link': 'https://google.com',
            'icon': 'google',
            'type': 'Action',
            'hidden': true,
        },
        {
            'name': 'GitHub',
            'link': 'https://github.com/shdwskip/PDC-Careers',
            'icon': 'github',
            'type': 'Social',
            'hidden': false,
        },
        {
            'name': 'LinkedIn2',
            'link': 'https://www.linkedin.com/in/daniel-dimitrov-659a4114a/',
            'icon': 'linkedin',
            'type': 'Social',
            'hidden': false,
        },
        {
            'name': 'Facebook',
            'link': 'https://facebook.com',
            'icon': 'facebook',
            'type': 'Social',
            'hidden': true,
        },
    ],
}];