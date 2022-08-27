import React from 'react';

import ReviewList from '../lists/ReviewList.jsx';
import ReviewMeta from '../cards/ReviewMeta.jsx';

const Reviews = () => {

  return (
    <div className='reviews-view'>
      <h2>{'Ratings & Reviews'}</h2>
      <div className='reviews-panels'>
        <ReviewMeta/>
        <ReviewList/>
      </div>
    </div>
  );

};

export default Reviews;
