const express = require('express');
const router = express.Router();
const { loginChecking } = require('../middleware/data-checking');
const { getUser, login } = require('../controllers/auth');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/user', getUser);

// @route     POST api/auth
// @desc      Log in user
// @access    Public
router.post('/login', loginChecking, login);

module.exports = router;
