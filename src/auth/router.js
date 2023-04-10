'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { usersModel } = require('./models/index');
const basicAuth = require('./middleware/basic');


// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res, next) => {
  console.log(req.body)
  try {
    // password is automatically hashed via .beforeCreate() method in barrel file (./models/index.js)
    const record = await usersModel.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', basicAuth, async (req, res) => {
  res.status(200).json({user: req.user})
})

module.exports = router;