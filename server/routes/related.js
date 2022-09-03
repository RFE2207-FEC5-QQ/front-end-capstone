require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/related', (req, res, next) => {
  if (!req.query.productId) {
    res.sendStatus(404);
    return;
  }
  const productId = req.query.productId;
  const relatedURL = process.env.API_URL + `products/${productId}/related`;

  axios
    .get(relatedURL, {
      headers: {
        'Authorization': process.env.GITHUB_AUTH,
      }
    })
    .then((success) => {
      const relatedIds = success.data;
      res.status(200).send(relatedIds);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

module.exports = router;
