const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('../../config').development.url;

if (mongoose.connection.readyState === 0) {
  mongoose.connect(connectionString);
}

// const CVSchema = new Schema({

// });
const JobAdSchema = new Schema({
  'title': {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 256,
  },
  'description': {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 16384,
  },
  'category': {
    type: String,
    enum: ['IT', 'Marketing', 'Sales', 'Operations', 'Other'],
    default: 'IT',
  },
  'status': {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  'usersApplied': [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
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
JobAdSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

JobAdSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now(),
    }
  });
});

JobAdSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now(),
    }
  });
});
/* eslint-enable */
module.exports = mongoose.model('JobAd', JobAdSchema);
