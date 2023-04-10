'use strict'

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { usersModel } = require('../models/index')

const basicAuth = async (request, response, next) => {
  // check to see if headers has authorization
  if (!request.headers.authorization) {
  // if no headers.authorization, send 401 error    
    response.send(401).send('MISSING AUTHORIZATION CREDENTIALS');
    return;
  }

  // if headers.authorization does exist, begin process of decoding
  // encoded string will be in a format of 'Basic username:password'
  // split string on space to isolate the encoded username:password
  let encodedAuthorizationCredentials = request.headers.authorization.split(' ')[1];

  // decode the username:password
  let decodedCredentials = base64.decode(encodedAuthorizationCredentials);

  // split decoded credentials on ':', everything to the left of the ':' is the username and everything to the right is the password
  let [decodedUserName, decodedPassword] = decodedCredentials.split(':');

  // query the database, find if database username === username from request
  let foundUser = await usersModel.findOne({where: {username: decodedUserName}})

  // if it does not exist, send an error
  if (!foundUser) {
    response.status(401).send('Invalid Username or Password');
    return;
  }

  // if it DOES exist, compare the DB user's saved password to the password from the request
  let isAuthenticated = await bcrypt.compare(decodedPassword, foundUser.password);
  if (isAuthenticated){
  // if they DO match, call next() to exit the middleware and move on to the next part of the server    
    next()
  }
  // if they don't match, send an error
  else {
    response.status(401).send('Invalid Username or Password')
  }
}

module.exports = basicAuth;