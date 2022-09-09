const axios = require('axios');
var reviewsCache = {};
var sortTypes = ['relevant', 'newest', 'helpful'];

const getAllProductReviews = (productId) => {
  return axios.get(process.env.API_URL + 'reviews/',
    {
      params: {
        'count': 1000,
        'product_id': productId
      },
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      return success.data.results;
    });
};

const sortNewest = (reviews) => {
  return reviews.slice().sort(function(a, b) {
    return b.review_id - a.review_id;
  });
};

const sortHelpful = (reviews) => {
  return reviews.slice().sort(function(a, b) {
    return b.helpfulness - a.helpfulness;
  });
};

const sortRelevant = (reviews) => {
  let reviewWeights = {};
  let sortedRelevant = [];
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];
    review['helpful'] = i;
    review['newest'] = null;
    reviewWeights[review.review_id] = review;
  }
  let newestSort = sortNewest(reviews);
  for (let i = 0; i < newestSort.length; i++) {
    let reviewId = newestSort[i].review_id;
    reviewWeights[reviewId]['relevance'] = reviewWeights[reviewId]['helpful'] + ((i + 1) * 1.2);
    delete reviewWeights[reviewId]['helpful'];
    sortedRelevant.push(reviewWeights[reviewId]);
  }
  sortedRelevant.sort(function(a, b) {
    return a['relevance'] - b['relevance'];
  });
  return sortedRelevant;
};

const sortReviews = (reviews, sortType) => {
  if (sortType === 'relevant') {
    return sortRelevant(reviews);
  }
  if (sortType === 'newest') {
    return sortNewest(reviews);
  }
  if (sortType === 'helpful') {
    return sortHelpful(reviews);
  }
};

// TODO: Call whenever there's a PUT or POST request, ensure the request doesn't resolve until the GET is complete
const updateProductReviewsCache = (productId) => {
  return getAllProductReviews(productId)
    .then((reviews) => {
      reviewsCache[productId] = {};
      for (let sort of sortTypes) {
        reviewsCache[productId][sort] = sortReviews(reviews, sort);
      }
    });
};

module.exports.getSortedReviews = (productId, sortType) => {
  if (reviewsCache[productId] && reviewsCache[productId][sortType]) {
    return Promise.resolve(reviewsCache[productId][sortType]);
  }
  return updateProductReviewsCache(productId)
    .then(() => {
      return reviewsCache[productId][sortType];
    });
};

module.exports.getReviewMeta = (productId) => {
  return axios.get(process.env.API_URL + 'reviews/meta',
    {
      params: {
        'product_id': productId
      },
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then((success) => {
      return success.data;
    });
};

module.exports.postReview = (review) => {
  return axios.post(process.env.API_URL + 'reviews/',
    {
      'product_id': review.productId,
      'rating': review.rating,
      'summary': review.summary,
      'body': review.body,
      'recommend': review.recommend,
      'name': review.name,
      'email': review.email,
      'photos': review.photos,
      'characteristics': review.characteristics
    },
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then(() => {
      return updateProductReviewsCache(review.productId);
    });
};

module.exports.markReviewHelpful = (reviewId, productId) => {
  return axios.put(`${process.env.API_URL}reviews/${reviewId}/helpful`,
    {},
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then(() => updateProductReviewsCache(productId));
};

module.exports.reportReview = (reviewId, productId) => {
  return axios.put(`${process.env.API_URL}reviews/${reviewId}/report`,
    {},
    {
      headers: { 'Authorization': process.env.GITHUB_AUTH }
    }
  )
    .then(() => updateProductReviewsCache(productId));
};