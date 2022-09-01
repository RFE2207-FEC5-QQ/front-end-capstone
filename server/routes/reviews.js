require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/reviews', (req, res, next) => {

});

router.get('/reviews/meta', (req, res, next) => {
  if (!req.query.productId) {
    res.sendStatus(404);
    return;
  }
  axios.get(process.env.API_URL + 'reviews/meta',
    {
      params: {
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

router.post('/reviews', (req, res, next) => {

});

module.exports = router;
