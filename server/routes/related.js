require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/related', (req, res, next) => {
  const productId = req.query.productId;
  const relatedURL = process.env.API_URL + `products/${productId}/related`;
  axios
    .get(relatedURL, {
      headers: {
        Authorization: process.env.GITHUB_AUTH,
      }
    })
    .then((results) => {
      const relatedIds = results.data;
      res.status(200).send(relatedIds);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.post('/related', (req, res, next) => {

});

// Temporary. Will use Daniel's router in final version.
router.get('/styles', (req, res, next) => {
  var id = req.query.productId
  var options = {
    method: 'get',
    url: `${process.env.API_URL}products/${id}/styles`,
    headers: {
      'Authorization': process.env.GITHUB_AUTH
    }
  }
  axios(options)
    .then(result => {
      console.log('styles data', result.data["product_id"], result.data.results[0].photos[0])
      res.status(200).send(result.data);
    })
    .catch(err => {
      res.sendStatus(404);
    })
})

module.exports = router;