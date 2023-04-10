'use strict'

const {app, Start} = require('./src/server')

// require Sequelize library. Destructure it to separate the actual 'Sequelize' ORM and the DataTypes necessary for creating DB models/schema
const { Sequelize, DataTypes } = require('sequelize');

// get SQL connection string
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:'

// Create a Sequelize model
// This should be moved into './src/auth/models' later
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Instantiate the sequelize ORM using the connection string
const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  sequelize,
  Users,
}