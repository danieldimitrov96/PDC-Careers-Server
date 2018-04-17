const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('../../config');
if (mongoose.connection.readyState === 0) {
  mongoose.connect(connectionString);
}

const ButtonSchema = new Schema({
  'name': {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 128,
  },
  'link': {
    type: String,
    required: true,
  },
  'icon': {
    type: String,
    required: true,
  },
  'type': {
    type: String,
    enum: ['Social', 'Action'],
    default: 'Social',
  },
  'hidden': {
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
ButtonSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

ButtonSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});

ButtonSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});
/* eslint-enable */
module.exports = mongoose.model('Button', ButtonSchema);
