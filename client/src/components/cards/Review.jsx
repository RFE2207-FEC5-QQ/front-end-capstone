import React from 'react';
import axios from 'axios';

const Review = ({review, getReviews}) =>{

  const markHelpful = () => {
    axios.put('/reviews/helpful', {
      reviewId: review.review_id
    })
      .then((success) => {
        // DEBUG - Uncomment to refresh reviews on success
        // getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reportReview = () => {
    axios.put('/reviews/report', {
      reviewId: review.review_id
    })
      .then((success) => {
        // DEBUG - Uncomment to refresh reviews on success
        // getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='review'>
      <p>{review.reviewer_name}</p>
      <p>{review.date}</p>
      <p>{review.rating}</p>
      <p>{review.recommend}</p>
      <p>{review.summary}</p>
      <p>{review.body}</p>
      <p onClick={markHelpful}>Helpful {review.helpfulness}</p>
      <p onClick={reportReview}>Report Review</p>
    </div>
  );

};

export default Review;
