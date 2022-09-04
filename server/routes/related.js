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


// // Temporary. Will use Daniel's router in final version.
// router.get('/styles', (req, res, next) => {
//   var id = req.query.productId
//   var options = {
//     method: 'get',
//     url: `${process.env.API_URL}products/${id}/styles`,
//     headers: {
//       'Authorization': process.env.GITHUB_AUTH
//     }
//   }
//   axios(options)
//     .then(result => {
//       console.log('styles data', result.data["product_id"], result.data.results[0].photos[0])
//       res.status(200).send(result.data);
//     })
//     .catch(err => {
//       res.sendStatus(404);
//     })
// })

// // Temporary. Will use Daniel's router in final version.
// router.get('/details', (req, res, next) => {
//   var id = req.query.productId;
//   console.log('id', id, 'req query', req.query)
//   var options = {
//     method: 'get',
//     url: `${process.env.API_URL}products/${id}`,
//     headers: {
//       'Authorization': process.env.GITHUB_AUTH
//     }
//   };
//   axios(options)
//     .then(result => {
//       console.log('detail result', result)
//       res.status(200).send(result.data);
//     })
//     .catch((err) => {
//       res.sendStatus(404);
//     })
// });

// // Also temporary. Will use Ryan's route when finalized.
// router.get('/reviews/meta', (req, res, next) => {
//   if (!req.query.productId) {
//     res.sendStatus(404);
//     return;
//   }
//   axios.get(process.env.API_URL + 'reviews/meta',
//     {
//       params: {
//         'product_id': req.query.productId
//       },
//       headers: { 'Authorization': process.env.GITHUB_AUTH }
//     }
//   )
//     .then((success) => {
//       res.status(200).send(success.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.sendStatus(404);
//     });
// });

module.exports = router;