const seeder = require('mongoose-seed');
const config = require('../../config');
const connectionString = config.URL;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

const {JobCategory, JobAd} = require('../models');

const sampleDescription =
`THIS IS SAMPLE DESCRIPTION
What are we looking for?
YOUR ROLE:
As a some level full- stack developer, you will be joining a small team of developers and test engineers, developing a complex multi-tier product, involving client and server-side software, web and mobile applications, web-services, microservices and using NodeJS, C#/.NET, TypeScript/JavaScript, PostgreSQL, Kafka etc.
You will be using the most modern tool-set to develop the solution in the best standards and in high quality. If this sounds like you, take a look at the job description below!

ESSENTIAL FUNCTIONS:
Developing code for new features on the front-end, backend, microservices, database and web-services.
Join a team effort to deliver product releases, according to specs in the most efficient and timely manner.
Taking active part in improvements and optimizations to the system’s core.
Be part of cross-functional team with end-to-end responsibility for end result.
YOUR CLIMBING GEAR:
1 year of relevant experience
Strong interest to develop as a Software Developer of WEB applications based on Node JS, Typescript, React JS,C#.
Deep understanding of OOP.
Understanding of SQL and DB development.
Fluency in English.`;

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
            title: 'Junior JS Developer'
        }).exec(),
        JobAd.findOne({
            title: 'Marketing Director',
        }).exec(),
        JobAd.findOne({
            title: 'PR Specialist',
        }).exec(),
        JobAd.findOne({
            title: 'Sales Consultant'
        }).exec(),
        JobAd.findOne({
            title: 'Sales Manager'
        }).exec(),
        JobAd.findOne({
            title: 'PM Team Lead'
        }).exec(),
        JobAd.findOne({
            title: 'Head of Team PM'
        }).exec(),
        JobAd.findOne({
            title: 'Personal Assistant to CTO'
        }).exec(),
        JobAd.findOne({
            title: 'Office Consultant'
        }).exec(),
        JobAd.findOne({
            title: 'Driver'
        }).exec(),
        JobAd.findOne({
            title: 'Senior Full-Stack Developer'
        }).exec(),
        JobAd.findOne({
            title: 'Web Designer'
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
                'title': 'Junior JS Developer',
                'description': sampleDescription,
                'category': IT_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Marketing Director',
                'description': sampleDescription,
                'category': MARKETING_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'PR Specialist',
                'description': sampleDescription,
                'category': MARKETING_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Sales Consultant',
                'description': sampleDescription,
                'category': SALES_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Sales Manager',
                'description': sampleDescription,
                'category': SALES_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'PM Team Lead',
                'description': sampleDescription,
                'category': OPERATIONS_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Head of Team PM',
                'description': sampleDescription,
                'category': OPERATIONS_CATEGORY._id,
                'status': 'Inactive',
            },
            {
                'title': 'Office Consultant',
                'description': sampleDescription,
                'category': OTHER_CATEGORY._id,
                'status': 'Inactive',
            },
            {
                'title': 'Personal Assistant to CTO',
                'description': sampleDescription,
                'category': OTHER_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Driver',
                'description': sampleDescription,
                'category': OTHER_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Senior Full-Stack Developer',
                'description': sampleDescription,
                'category': IT_CATEGORY._id,
                'status': 'Active',
            },
            {
                'title': 'Web Designer',
                'description': sampleDescription,
                'category': IT_CATEGORY._id,
                'status': 'Active',
            },
        ],
    }];
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

    const [JUNIORJS, MARKETING, PRSPEC, SALES, SALESMAN,
            PMLEAD, HEADPM, PERSONALCTO, OFFICE, DRIVER, SENIORDEV, WEBD] = await getJobs();

    IT_CATEGORY.jobs.push(JUNIORJS);
    IT_CATEGORY.jobs.push(SENIORDEV);
    IT_CATEGORY.jobs.push(WEBD);
    console.log('it success');
    MARKETING_CATEGORY.jobs.push(MARKETING);
    MARKETING_CATEGORY.jobs.push(PRSPEC);
    console.log('marketing success');
    SALES_CATEGORY.jobs.push(SALES);
    SALES_CATEGORY.jobs.push(SALESMAN);
    console.log('sales success');
    OPERATIONS_CATEGORY.jobs.push(PMLEAD);
    OPERATIONS_CATEGORY.jobs.push(HEADPM);
    console.log('operations success');
    OTHER_CATEGORY.jobs.push(PERSONALCTO);
    OTHER_CATEGORY.jobs.push(OFFICE);
    OTHER_CATEGORY.jobs.push(DRIVER);
    console.log('other success');
    
    IT_CATEGORY.save();
    MARKETING_CATEGORY.save();
    SALES_CATEGORY.save();
    OPERATIONS_CATEGORY.save();
    OTHER_CATEGORY.save();
}
run();