const passport = require('passport');
const Tournament = require('../models/Tournament');
const { createTournament } = require('../middleware/tournaments');

module.exports.getAllActiveTournaments = async (req, res) => {
  try {
    const activeTournaments = await Tournament.find({ isActive: true }).sort({
      startDate: -1,
    });
    res.status(200).json(activeTournaments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports.getOneTournaments = async (req, res) => {
  const tournamentID = req.params.tournamentID;

  try {
    const tournament = await Tournament.findById(tournamentID);

    if (!tournament) {
      return res.status(404).json({ msg: 'Tournament not found' });
    }

    res.status(200).json(tournament);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports.getOwnedTournaments = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication error' });
    }

    try {
      const ownedTournaments = await Tournament.find({
        'owner.userID': user.id,
      });

      if (ownedTournaments.length === 0) {
        return res.status(404).json({ msg: 'Tournament not found' });
      }

      res.status(200).json(ownedTournaments);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err });
    }
  })(req, res, next);
};

module.exports.createTournament = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication error' });
    }

    try {
      const newTournament = await createTournament(req, user);
      const tournament = await Tournament.create(newTournament);

      res.status(200).json(tournament);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err });
    }
  })(req, res, next);
};

module.exports.updateTournament = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication error' });
    }

    try {
      const tournamentID = req.params.tournamentID;
      const tournamentToBeUpdated = req.body;

      const tournament = await Tournament.findOneAndUpdate(
        { _id: tournamentID },
        tournamentToBeUpdated
      );

      if (!tournament) {
        return res.status(404).json({ msg: 'Tournament not found' });
      }

      const updatedTournament = await Tournament.findById(tournamentID);

      res.status(200).json(updatedTournament);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ err });
    }
  })(req, res, next);
};

module.exports.deleteTournament = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (info) {
      return res.status(400).json({ info: 'Not authorized' });
    }

    if (err) {
      return res.status(400).json({ err: 'Authentication error' });
    }

    const tournamentID = req.params.tournamentID;
    try {
      const tournamentToBeDeleted = await Tournament.findById(tournamentID);
      console.log(tournamentToBeDeleted);
      if (
        tournamentToBeDeleted.owner.userID.toString() === user.id.toString()
      ) {
        await Tournament.findByIdAndDelete(tournamentID);
        res.status(200).json('Tournament deleted');
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ err });
    }
  })(req, res, next);
};
