const mongoose = require('mongoose');

const {
    User,
    JobAd,
} = require('../models');

// ------------------------
// ADD SEEDS BELOW
// ------------------------


// suggested module for generating fake contextual data
// var Faker = require('faker');


// For Example

// CoolUser.create([
//   { name: 'andy', age: 24 },
//   { name: 'alex', age: 23 },
//   { name: Faker.name.firstName(), age: Faker.random.number() }
// ])

// .then(() => {
//   console.log("Seed complete!")
//   mongoose.connection.close();
// });

// be sure to close the connection once the queries are done

// JobAd.create({
//     title: 'Test',
//     description: 'This is a test job',
//     category: 'IT',
//     status: 'Active',
// })
// .then(() => {
//     console.log('Seed complete!');
//     // mongoose.connection.close();
// });

// User.create({
//     email: 'PAVEL_DENEV@test.com',
//     password: '123',
//     isAdmin: false,
// }).then(() => {
//     console.log('Seed complete!');
//     // mongoose.connection.close();
// }).catch((err) => {
//     // console.log(err);
//     console.log('User already exists!');
// });

const run = async () => {
    const currentJobAd = await JobAd.findOne({
        title: 'Test',
    }).exec();

    const user = await User.findOne({
        email: 'pavel_denev@test.com',
    }).exec();

    user.appliedJobs.push(currentJobAd);
    user.save();
};


run();
// currentUser.appliedJobs.push(currentJobAd);
// currentUser.save();
// console.log(currentUser);
// console.log(currentJobAd);
// console.log(currentUser.appliedJobs);
// currentUser.save(function (err) {
//     currentUser.populate(currentJobAd, { path: 'appliedJobs' });
// });
