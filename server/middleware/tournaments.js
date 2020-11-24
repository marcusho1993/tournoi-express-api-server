// middleware for init Tournament
module.exports.createTournament = (req, user) => {
  return new Promise(async (resolve, reject) => {
    let {
      title,
      description,
      startDate,
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      player8,
    } = req.body;

    const playerNames = [
      player1,
      player2,
      player3,
      player4,
      player5,
      player6,
      player7,
      player8,
    ];

    const players = await initPlayerList(playerNames);
    const bouts = await initBouts(playerNames);
    const rounds = await initRounds(bouts);
    startDate = new Date(startDate);

    const isActive = Date.now() >= startDate ? true : false;

    const owner = { userID: user.id, name: user.username };

    const newTournament = {
      owner: owner,
      title,
      description,
      startDate,
      players,
      rounds,
      isActive,
    };

    resolve(newTournament);
  });
};

const initPlayerList = playerNames => {
  return new Promise((resolve, reject) => {
    let playerList = [];
    playerNames.forEach(playerName => {
      playerList.push({
        name: playerName,
        placement: 4,
      });
    });

    if (playerList.length === 8) {
      resolve(playerList);
    } else {
      reject('Players are not 8');
    }
  });
};

const initBouts = playerNames => {
  return new Promise((resolve, reject) => {
    let bouts = [];
    let index = 0;
    for (let i = 0; i < 4; i++) {
      bouts.push({
        boutPlayers: [
          {
            name: playerNames[index],
          },
          {
            name: playerNames[index + 1],
          },
        ],
      });
      index = index + 2;
    }

    if (bouts.length === 4) {
      resolve(bouts);
    } else {
      reject('Bouts are not 4');
    }
  });
};

const initRounds = bouts => {
  return new Promise((resolve, reject) => {
    let rounds = [];
    let newBoutPlayer = { name: '' };
    rounds[0] = {
      roundNumber: 1,
      bouts: bouts,
    };

    rounds[1] = {
      roundNumber: 2,
      bouts: [
        {
          boutPlayers: [newBoutPlayer, newBoutPlayer],
        },
        {
          boutPlayers: [newBoutPlayer, newBoutPlayer],
        },
      ],
    };

    rounds[2] = {
      roundNumber: 3,
      bouts: [
        {
          boutPlayers: [newBoutPlayer, newBoutPlayer],
        },
      ],
    };

    rounds[3] = {
      roundNumber: 4,
      bouts: [
        {
          boutPlayers: [newBoutPlayer],
        },
      ],
    };

    resolve(rounds);
  });
};
