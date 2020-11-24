const express = require('express');
const router = express.Router();
const {
  getAllActiveTournaments,
  getOneTournaments,
  getOwnedTournaments,
  createTournament,
  updateTournament,
  deleteTournament,
} = require('../controllers/tournaments');

// @route     GET api/tournaments
// @desc      Get all active tournaments
// @access    Public
router.get('/active', getAllActiveTournaments);

// @route     GET api/tournaments
// @desc      Get owner's tournaments
// @access    Private
router.get('/owned', getOwnedTournaments);

// @route     GET api/tournaments
// @desc      Get one tournament
// @access    Public
router.get('/:tournamentID', getOneTournaments);

// @route     POST api/tournaments
// @desc      Create tournament
// @access    Private
router.post('/add', createTournament);

// @route     POST api/tournaments
// @desc      Update tournament
// @access    Private
router.put('/:tournamentID/update', updateTournament);

// @route     POST api/tournaments
// @desc      Delete tournament
// @access    Private
router.delete('/:tournamentID/delete', deleteTournament);

module.exports = router;
