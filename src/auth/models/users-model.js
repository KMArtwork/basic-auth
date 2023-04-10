'use strict'

// destructure 'DataTypes' from sequelize library
const { DataTypes } = require('sequelize');

// instantiated sequelize ORM will be passed in from the barrel file (./index.js)
const Users = (sequelize) => sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Users;