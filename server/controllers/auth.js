const config = require('config');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

let jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get('jwtSecret');
}

module.exports.getUser = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not Authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication Error' });
    } else {
      res.status(200).json(user);
    }
  })(req, res, next);
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not Authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication Error' });
    } else {
      const payload = { id: user.id };
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token, info });
        }
      );
    }
  })(req, res, next);
};
