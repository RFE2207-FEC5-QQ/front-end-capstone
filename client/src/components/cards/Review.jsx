import React from 'react';

const Review = ({review}) => {


  return (
    <div className='review'>
      <p>{review.reviewer_name}</p>
      <p>{review.date}</p>
      <p>{review.rating}</p>
      <p>{review.recommend}</p>
      <p>{review.summary}</p>
      <p>{review.body}</p>
      <p>{review.helpfulness}</p>
    </div>
  );

};

export default Review;
