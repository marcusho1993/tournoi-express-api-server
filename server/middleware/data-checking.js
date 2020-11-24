const { check } = require('express-validator');

module.exports.registerChecking = [
  check('username', 'Please include a valid username').not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];

module.exports.loginChecking = [
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
];
