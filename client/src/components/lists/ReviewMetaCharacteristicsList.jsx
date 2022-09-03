import React from 'react';

import ReviewMetaCharacteristic from '../cards/ReviewMetaCharacteristic.jsx';

const ReviewMetaCharacteristicsList = ({characteristics, characteristicChart}) => {

  return (
    <div className='review-meta-characteristics'>
      <h2 className='review-meta-title'>Characteristics</h2>
      {Object.keys(characteristics).map((key) => (
        <ReviewMetaCharacteristic
          key={key}
          char={key}
          characteristics={characteristics}
          characteristicChart={characteristicChart}
        />
      ))}
    </div>
  );

};

export default ReviewMetaCharacteristicsList;
