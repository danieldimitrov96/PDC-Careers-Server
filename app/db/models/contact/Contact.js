const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  'name': {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
  },
  'address': {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  'isPrimary': {
    type: Boolean,
    default: false,
  },
  'createdAt': {
    type: Date,
    default: Date.now(),
  },
  'updatedAt': {
    type: Date,
    default: Date.now(),
  },
});
/* eslint-disable */
ContactSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

ContactSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});

ContactSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});
/* eslint-enable */

module.exports = mongoose.model('Contact', ContactSchema);
