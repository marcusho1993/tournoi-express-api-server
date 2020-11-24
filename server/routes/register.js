const express = require('express');
const router = express.Router();
const { registerChecking } = require('../middleware/data-checking');
const { register } = require('../controllers/register');

// @route     POST api/register
// @desc      Register a user
// @access    Public
router.post('/', registerChecking, register);

module.exports = router;
