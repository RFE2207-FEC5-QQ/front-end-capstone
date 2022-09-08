require('dotenv').config();
const express = require('express');
const router = express.Router();
const model = require('../models/reviewsModel.js');

// Get reviews for productId
// Expects 'sort' and 'productId' in query
router.get('/reviews', (req, res, next) => {
  if (!req.query.sort || !req.query.productId) {
    res.sendStatus(404);
    return;
  }
  model.getSortedReviews(req.query.productId, req.query.sort)
    .then((reviews) => {
      res.status(200).send({
        reviews: reviews.slice(0, req.query.count),
        atListEnd: req.query.count >= reviews.length
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

router.get('/reviews/meta', (req, res, next) => {
  if (!req.query.productId) {
    res.sendStatus(404);
    return;
  }
  model.getReviewMeta(req.query.productId)
    .then((reviewMeta) => res.status(200).send(reviewMeta))
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

router.post('/reviews', (req, res, next) => {
  let review = {
    'productId': req.body.productId,
    'rating': req.body.rating,
    'summary': req.body.summary,
    'body': req.body.body,
    'recommend': req.body.recommend,
    'name': req.body.name,
    'email': req.body.email,
    'photos': req.body.photos,
    'characteristics': req.body.characteristics
  };
  model.postReview(review)
    .then(() => {
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
  if (!req.body.reviewId || !req.body.productId) {
    res.sendStatus(404);
    return;
  }
  model.markReviewHelpful(req.body.reviewId, req.body.productId)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

});

// Reports review
// Expects 'reviewId' in body
router.put('/reviews/report', (req, res, next) => {
  if (!req.body.reviewId || !req.body.productId) {
    res.sendStatus(404);
    return;
  }
  model.reportReview(req.body.reviewId, req.body.productId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
