'use strict'

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const basicAuth = require('./auth/middleware/basic')

// Allows us to 'talk' to other websites
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
app.post('/signin', async (req, res) => {

});

app.use(basicAuth)


module.exports = {
  app,
  // make sure our tables are created, start up the HTTP server.
  start: (PORT) => app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
  })
}