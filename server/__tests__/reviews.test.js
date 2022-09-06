const request = require('supertest');
const app = require('../app.js');

describe('\'/reviews\' routes', () => {

  let reviewCount = 2;
  test(`Expect ${reviewCount} reviews to be fetched from server`, async () => {
    await request(app)
      .get('/reviews')
      .query({
        productId: '37311',
        sort: 'newest',
        count: reviewCount,
        page: 1
      })
      .then((success) => {
        let reviews = success.body.results;
        expect(Array.isArray(reviews)).toBe(Array.isArray([]));
        expect(reviews.length).toBe(reviewCount);
        expect(success.statusCode).toBe(200);
      });
  });


  test('Expect review to be posted to server', async () => {
    let postReview = {
      productId: 37311,
      rating: 5,
      summary: 'Postman posting hello hello',
      body: 'We\'re doing a little test with Postman so don\'t mind it. If you need to test truncating review body text well this gives you quite a good opportunity now doesn\'t it? It\'s great sending POST requests using Postman! Are we at 250 characters now? No? Yes? I\'ll just keep writing until we should be.',
      recommend: true,
      name: 'Ryan',
      email: 'ryan@example.com',
      photos: [],
      characteristics: {}
    };
    await request(app)
      .post('/reviews')
      .send(postReview)
      .then((success) => {
        expect(success.statusCode).toBe(201);
      });
  });

  test('Expect review metadata to be fetched from server', async () => {
    await request(app)
      .get('/reviews/meta')
      .query({
        productId: '37311'
      })
      .then((success) => {
        expect(success.statusCode).toBe(200);
      });
  });

  // Mark review as helpful
  test('Expect review to be marked as helpful', async () => {
    let reviewId = 1275329;
    await request(app)
      .put('/reviews/helpful')
      .send({reviewId})
      .then((success) => {
        expect(success.statusCode).toBe(204);
      });
  });

  // Report review
  test('Expect review to be reported', async () => {
    let reviewId = 1115673;
    await request(app)
      .put('/reviews/report')
      .send({reviewId})
      .then((success) => {
        expect(success.statusCode).toBe(204);
      });
  });

});

