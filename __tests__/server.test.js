'use strict'

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const base64 = require('base-64')
const { sequelize, usersModel } = require('../src/auth/models/index')

beforeAll(async() => {
  await sequelize.sync();
});

afterAll(async() => {
  await sequelize.drop();
});

describe('Testing if server handles requests properly', () => {

  test('Should send a 201 on successful POST to /signup', async () => {
    let req = {
      username: 'thedude',
      password: 'elduderino123'
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(201);
  })

  test('Should send a 200 on a successful POST to /signin', async () => {
    const response = await request.post('/signin').set('Authorization', `Basic ${base64.encode(`thedude:elduderino123`)}`);
    expect(response.status).toEqual(200);
  })

  test('Should FAIL on POST to /signup with no password', async () => {
    let req = {
      username: 'thedude',
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  test('Should FAIL on POST to /signup with no username', async () => {
    let req = {
      password: 'elduderino123'
    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  test('Should FAIL on POST to /signup with no body', async () => {
    let req = {

    }
    const response = await request.post('/signup').send(req);
    expect(response.status).toEqual(403);
  })

  test('Should FAIL on POST to /signin with invalid credentials', async () => {
    const response = await request.post('/signin').set('Authorization', `Basic ${base64.encode(`thedude:elduderino456`)}`);
    expect(response.status).toEqual(500);
  })

})