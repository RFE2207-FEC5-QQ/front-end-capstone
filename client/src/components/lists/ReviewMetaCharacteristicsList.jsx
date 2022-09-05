import React from 'react';
import { Skeleton } from '@mui/material';

import ReviewMetaCharacteristic from '../cards/ReviewMetaCharacteristic.jsx';

const ReviewMetaCharacteristicsList = ({reviewMeta, characteristicChart}) => {

  if (!reviewMeta) {
    return (
      <div className='review-meta-characteristics'>
        <h2 className='review-meta-title'>Characteristics</h2>
        <Skeleton variant="rectangular" height='200px'/>
      </div>
    );
  }

  return (
    <div className='review-meta-characteristics'>
      <h2 className='review-meta-title'>Characteristics</h2>
      {Object.keys(reviewMeta.characteristics).map((key) => (
        <ReviewMetaCharacteristic
          key={key}
          char={key}
          characteristics={reviewMeta.characteristics}
          characteristicChart={characteristicChart}
        />
      ))}
    </div>
  );

};

export default ReviewMetaCharacteristicsList;
