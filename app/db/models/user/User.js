// Change callbacks with async await
// Check if password encryption can be setter
// move mongoose.connect in index
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const connectionString = require('../../config');
const {
  mailValidator,
} = require('./validator');

if (mongoose.connection.readyState === 0) {
  mongoose.connect(connectionString);
}

const SALT_FACTOR = 5;

const toLower = (email) => {
  return email.toLowerCase();
};

const UserSchema = new Schema({
  'email': {
    type: String,
    required: true,
    unique: true,
    set: toLower,
    match: mailValidator,
  },
  'password': {
    type: String,
    required: true,
  },
  'isAdmin': {
    type: Boolean,
  },
  'appliedJobs': [{
    job: {
      type: Schema.Types.ObjectId,
      ref: 'JobAd',
    },
    application: {
      type: Schema.Types.ObjectId,
      ref: 'JobApplication',
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
UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, false, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.pre('update', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now(),
    },
  });
});

UserSchema.pre('findOneAndUpdate', function () {
  this.update({}, {
    $set: {
      updatedAt: Date.now(),
    },
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
/* eslint-enable */
module.exports = mongoose.model('User', UserSchema);
