const express = require('express');
const router = express.Router();

// @route     GET
// @desc      Index
// @access    Public
router.get('/', (req, res) => {
  res.send('Welcome to Tournoi API server');
});

module.exports = router;
