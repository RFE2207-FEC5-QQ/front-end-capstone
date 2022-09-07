import React from 'react';

import ReviewImage from '../cards/ReviewImage.jsx';

const ReviewImageList = ({photoUrls}) => {

  return (
    <div className='review-images'>
      {photoUrls.map((photoUrl, index) => {
        return (
          <ReviewImage id={photoUrl} url={photoUrl} key={index}/>
        );
      })}
    </div>
  );

};

export default ReviewImageList;
