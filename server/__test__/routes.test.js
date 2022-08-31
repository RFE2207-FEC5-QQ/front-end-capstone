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
      });
  });

});

