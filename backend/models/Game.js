const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Game = sequelize.define('Game', {
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING
  },
  platform: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER
  },
  hours: {
    type: DataTypes.INTEGER
  },
  finished: {
    type: DataTypes.BOOLEAN
  },
  playing: {
    type: DataTypes.BOOLEAN
  }
});

module.exports = Game;
