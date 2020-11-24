const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

let jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get('jwtSecret');
}

// @route     POST api/users
// @desc      Register a user
// @access    Public
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    newUser = new User({
      username,
      email,
    });

    User.register(newUser, password, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
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
            res.json({ token });
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Sever Error...');
  }
};
