module.exports = {
  //Level grid
  level1: require('../grids/room1'),

  //Map configuration
  map: {
    width: 52,
    height: 27,
    tile: {
      width: 20,
      height: 20
    }
  },

  //Zombie controller configuration
  ZombieController: {
    name: 'Wendy',
    ZombieController: true
  },


  //Player 1 configuration
  player1: {
    name: 'Chicken',
    speed: 3,
    gun: {
      name: 'pistol',
      damage: 1,
      speed:  3,
      frequency: 1,
      distance: 300
    }
  },

  //Player 2 configuration
  player2: {
    name: 'Zaiaiai',
    speed: 2,
    gun: {
      name: 'shotgun',
      damage: 5,
      speed:  2,
      frequency: 2,
      distance: 200
    }
  },

  //Player 3 configuration
  player3: {
    name: 'Chicho',
    speed: 2,
    gun: {
      name: 'rifle',
      damage: 10,
      speed:  3,
      frequency: 5,
      distance: 1000
    }
  },

  //Zombie 1 configuration
  zombie1: {
    name: 'Mechor',
    speed: 1,
    life: 10
  },

  //Zombie 2 configuration
  zombie2: {
    name: 'Gaspar',
    speed: 2,
    life: 15
  },

  //Zombie 3 configuration
  zombie3: {
    name: 'Baltazar',
    speed: 1,
    life: 20
  }

};
