const seeder = require('mongoose-seed');
const config = require('../../config');
const connectionString = config.URL;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

const {JobCategory, JobAd} = require('../models');



const getCategories = async () => {
    return Promise.all([
        JobCategory.findOne({
            type: 'IT'
        }).exec(),
        JobCategory.findOne({
            type: 'Sales'
        }).exec(),
        JobCategory.findOne({
            type: 'Marketing'
        }).exec(),
        JobCategory.findOne({
            type: 'Operations'
        }).exec(),
        JobCategory.findOne({
            type: 'Other'
        }).exec(),
    ]);

}

const getJobs = async () => {
    return Promise.all([
        JobAd.findOne({
            title: 'Junior Developer'
        }).exec(),
        JobAd.findOne({
            title: 'Marketing Director',
        }).exec(),
        JobAd.findOne({
            title: 'Sales consultant'
        }).exec(),
        JobAd.findOne({
            title: 'Operations Team Lead'
        }).exec(),
        JobAd.findOne({
            title: 'Office Consultant'
        }).exec(),
        JobAd.findOne({
            title: 'Some Other Position'
        }).exec(),
    ]);
}


const run = async () => {
    const [IT_CATEGORY, SALES_CATEGORY, MARKETING_CATEGORY,
            OPERATIONS_CATEGORY, OTHER_CATEGORY] = await getCategories();
    mongoose.disconnect();
    const data = [{
        'model': 'JobAd',
        'documents': [{
                'title': 'Junior Developer',
                'description': 'This is a test IT job',
                'category': IT_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Marketing Director',
                'description': 'This is a test Marketing job',
                'category': MARKETING_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Sales consultant',
                'description': 'This is a test Sales job',
                'category': SALES_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Operations Team Lead',
                'description': 'This is a test Operations job',
                'category': OPERATIONS_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Office Consultant',
                'description': 'This is a test Other job',
                'category': OTHER_CATEGORY._id,
                'status': 'Inactive',
            },
            {
                'title': 'Some Other Position',
                'description': 'This is a test Other job',
                'category': OTHER_CATEGORY._id,
                'status': 'Active',
            },
        ],
    }];
    // console.log(data);
    seeder.connect(connectionString, function () {
        seeder.loadModels([
            'app/db//models/jobad/JobAd.js',
        ]);

        seeder.clearModels(['JobAd'], function () {
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        });
    });

    const [DEVELOPER, MARKETING, SALES, LEAD, OFFICE, OTHER] = await getJobs();

    IT_CATEGORY.jobs.push(DEVELOPER);
    console.log('it success');
    MARKETING_CATEGORY.jobs.push(MARKETING);
    console.log('marketing success');
    SALES_CATEGORY.jobs.push(SALES);
    console.log('sales success');
    OPERATIONS_CATEGORY.jobs.push(LEAD);
    console.log('operations success');
    OTHER_CATEGORY.jobs.push(OFFICE);
    console.log('other success');
    OTHER_CATEGORY.jobs.push(OTHER);
    console.log('other2 success');
    
    IT_CATEGORY.save();
    MARKETING_CATEGORY.save();
    SALES_CATEGORY.save();
    OPERATIONS_CATEGORY.save();
    OTHER_CATEGORY.save();
}
run();