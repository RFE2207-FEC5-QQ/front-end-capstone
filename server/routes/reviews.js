require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get reviews for productId
// Expects 'sort' and 'productId' in query
router.get('/reviews', (req, res, next) => {
  if (!req.query.sort || !req.query.productId) {
    res.sendStatus(404);
    return;
  }
  axios.get(process.env.API_URL + 'reviews/',
    {
      params: {
        'page': req.query.page || 1,
        'count': req.query.count || 5,
        'sort': req.query.sort,
        'product_id': req.query.productId
      },
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      res.status(200).send(success.data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

// Post new review
// Expects review information in body
router.post('/reviews', (req, res, next) => {
  axios.post(process.env.API_URL + 'reviews/',
    {
      'product_id': req.body.productId,
      'rating': req.body.rating,
      'summary': req.body.summary,
      'body': req.body.body,
      'recommend': req.body.recommend,
      'name': req.body.name,
      'email': req.body.email,
      'photos': req.body.photos,
      'characteristics': req.body.characteristics
    },
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(401);
    });
});

// Mark review as helpful
// Expects 'reviewId' in body
router.put('/reviews/helpful', (req, res, next) => {
  console.log(req.body);
  if (!req.body.reviewId) {
    res.sendStatus(404);
    return;
  }
  axios.put(`${process.env.API_URL}reviews/${req.body.reviewId}/helpful`,
    {},
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Reports review
// Expects 'reviewId' in body
router.put('/reviews/report', (req, res, next) => {
  console.log(req.body);
  if (!req.body.reviewId) {
    res.sendStatus(404);
    return;
  }
  axios.put(`${process.env.API_URL}reviews/${req.body.reviewId}/report`,
    {},
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;