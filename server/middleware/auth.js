const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');

const User = require('../models/User');

let jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get('jwtSecret');
}

let opts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
  secretOrKey: jwtSecret,
};

passport.use(
  'jwt',
  new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err, false, { msg: 'User not found' });
      });
  })
);
