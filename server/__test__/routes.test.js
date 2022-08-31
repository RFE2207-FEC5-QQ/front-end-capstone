const request = require('supertest');
const app = require('../app.js');


describe('Routes testing', () => {

  test('Expect 2 reviews to be fetched from server on GET request to reviews endpoint', () => {
    request(app).get('/reviews?productId=37311&sort=newest&count=2&page=1')
      .then((success) => {
        let reviews = success.body.results;
        expect(reviews.length).toBe(2);
      });
  });

});

