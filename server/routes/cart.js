require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/cart', (req, res, next) => {
  axios.get(`${process.env.API_URL}cart`)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
});

router.post('/cart', (req, res, next) => {
  axios.post(`${process.env.API_URL}cart`,
    req.body,
    {
      headers: {
        'Authorization': process.env.GITHUB_AUTH
      }
    }
  )
  .then(() => {
    res.sendStatus(201);
  })
  .catch(() => {
    res.sendStatus(422);
  })
});

module.exports = router;
