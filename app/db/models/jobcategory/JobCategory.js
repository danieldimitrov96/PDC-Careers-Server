const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connectionString = require('../../config');
if (mongoose.connection.readyState === 0) {
  mongoose.connect(connectionString);
}


const JobCategorySchema = new Schema({
  'type': {
    type: String,
    required: true,
  },
  'job': [
    {
      job: {
        type: Schema.Types.ObjectId,
        ref: 'JobAd',
      },
    },
  ],
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
JobCategorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

JobCategorySchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});

JobCategorySchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now()
    }
  });
});
/* eslint-enable */

module.exports = mongoose.model('JobCategory', JobCategorySchema);
