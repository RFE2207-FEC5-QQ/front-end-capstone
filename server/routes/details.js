require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/details', (req, res, next) => {
  var options = {
    method: 'get',
    url: `${process.env.API_URL}products`,
    headers: {
      'Authorization': process.env.GITHUB_AUTH
    }
  }
  axios(options)
    .then(success => {
      console.log('data in details.js: ', success.data);
      res.status(200).send(success.data)
    })
    .catch((err) => {
      res.sendStatus(404);
    })
});

router.post('/details', (req, res, next) => {

});

module.exports = router;