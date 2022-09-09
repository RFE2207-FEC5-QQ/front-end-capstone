import React from 'react';

import ReviewImage from '../cards/ReviewImage.jsx';

const ReviewImageList = ({photoUrls, errorResponse}) => {

  return (
    <div className='review-images'>
      {photoUrls.map((photoUrl, index) => {
        return (
          <ReviewImage
            id={photoUrl}
            url={photoUrl}
            errorResponse={errorResponse}
            key={index}
          />
        );
      })}
    </div>
  );

};

export default ReviewImageList;
