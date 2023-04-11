'use strict'

// destructure 'DataTypes' from sequelize library
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

// instantiated sequelize ORM will be passed in from the barrel file (./index.js)
const Users = (sequelize) => {
  let users = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
  
  users.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  })

  users.authenticateUser = async (username, password) => {

        // query the database, find if database username === username from request
        let foundUser = await users.findOne({where: {username: username}});
        // if a username is found, compare saved password to password from request
        let isAuthenticated = await bcrypt.compare(password, foundUser.password);
    
        if (isAuthenticated) {
          return foundUser;
        }
        else {
          throw new Error('Invalid credentials')
        }

  }

  return users;
};

module.exports = Users;