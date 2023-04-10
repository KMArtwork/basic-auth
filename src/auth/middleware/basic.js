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


  try {
    // query the database, find if database username === username from request
    let foundUser = await usersModel.findOne({where: {username: decodedUserName}});
    // if a username is found, compare saved password to password from request
    let isAuthenticated = await bcrypt.compare(decodedPassword, foundUser.password);

    if (isAuthenticated) {
    // if passwords match, invoke next()
      next();
    }
    else {
      throw new Error('Invalid Username or Password')
    }
  } 
  catch (error) {
    response.status(403).send('Invalid Username or Password')
  }

}

module.exports = basicAuth;