'use strict'

const bcrypt = require('bcrypt');

// require Sequelize library. Destructure it to separate the actual 'Sequelize' ORM and the DataTypes necessary for creating DB models/schema
const { Sequelize } = require('sequelize');

// get SQL connection string
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:'

// require data models for tables
const users = require('./users-model');

// Instantiate the sequelize ORM using the connection string
const sequelize = new Sequelize(DATABASE_URL);

// pass instantiated sequelize ORM to the db models so that sequelize knows how to define each model/table
const usersModel = users(sequelize);

// usersModel.beforeCreate(async user => {
//   user.password = await bcrypt.hash(user.password, 10);
// })

module.exports = {
  sequelize,
  usersModel,
}