module.exports.sortRelevant = (reviews) => {
  let reviewWeights = {};
  let sortedRelevant = [];
  for (let i = 0; i < reviews.length; i++) {
    let review = reviews[i];
    review['helpful'] = i;
    review['newest'] = null;
    reviewWeights[review.review_id] = review;
  }
  let newestSort = reviews.slice().sort(function(a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
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
