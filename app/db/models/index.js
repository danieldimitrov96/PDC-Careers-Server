/* eslint-disable */
const fs = require('fs');

//require all the models 
const models = {};
const names = fs.readdirSync(__dirname);

names.forEach(name => {
    const modelPath = './' + name;
    if (name === 'validator.js' || name === 'index.js') return;
    const model = require(modelPath);
    models[model.modelName] = model;
});

// define non-enumerable method to place each model onto an object. primarily for making them global
Object.defineProperty(models.__proto__, 'toContext', {
    enumerable: false,
    value: function (context) {
        for (var name in this) {
            context[name] = this[name];
        }
        return context;
    }
});


module.exports = models;