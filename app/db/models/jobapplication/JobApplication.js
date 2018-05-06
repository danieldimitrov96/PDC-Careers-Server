const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema({
  'firstName': {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  'lastName': {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  'comment': {
    type: String,
    maxlength: 1024,
  },
  'user': {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  'job': {
    type: Schema.Types.ObjectId,
    ref: 'JobAd',
  },
  'CV': {
    type: String,
    required: true,
  },
  'CoverLetter': {
    type: String,
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
JobApplicationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

JobApplicationSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});

JobApplicationSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});
/* eslint-enable */
module.exports = mongoose.model('JobApplication', JobApplicationSchema);
