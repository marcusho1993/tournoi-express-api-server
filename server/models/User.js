const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const options = { usernameField: 'email' };
UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model('user', UserSchema);
