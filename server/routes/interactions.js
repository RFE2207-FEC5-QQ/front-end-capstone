require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/interactions', (req, res, next) => {

});

router.post('/interactions', (req, res, next) => {
  axios.post(`${process.env.API_URL}interactions`,
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
