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
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
});

router.get('/info', (req, res, next) => {
  var id = req.query.id;
  var options = {
    method: 'get',
    url: `${process.env.API_URL}products/${id}/`,
    headers: {
      'Authorization': process.env.GITHUB_AUTH
    }
  }
  axios(options)
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch(err => {
      res.sendStatus(404);
    })
})

router.get('/styles', (req, res, next) => {
  var id = req.query.id
  var options = {
    method: 'get',
    url: `${process.env.API_URL}products/${id}/styles`,
    headers: {
      'Authorization': process.env.GITHUB_AUTH
    }
  }
  axios(options)
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch(err => {
      res.sendStatus(404);
    })
})

router.post('/details', (req, res, next) => {

});

module.exports = router;
