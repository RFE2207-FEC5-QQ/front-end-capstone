const request = require('supertest');
const app = require('../app.js');

const route = '/';

describe(`${route} routes`, () => {

  test('Expect GET to (y)', async () => {
    await request(app)
      .get(route)
      .then((success) => {
        // SUCCESSFUL GET REQUEST
        // expect()
      });
  });

});

