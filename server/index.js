require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

// Only required in production
// TODO: Figure out how to prevent this from running in development mode rather than just commenting out
app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/reviews', (req, res, next) => {
  console.log(req.method);
  console.log(req.query);
  axios.get(process.env.API_URL,
    {
      params: { 'product_id': req.query.productId },
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

app.listen(process.env.SV_PORT);
console.log(`Listening on port ${process.env.SV_PORT}`);