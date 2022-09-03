import React from 'react';

import ReviewMetaCharacteristic from '../cards/ReviewMetaCharacteristic.jsx';

const ReviewMetaCharacteristicsList = ({characteristics, characteristicChart}) => {

  return (
    <div className='review-meta-characteristics'>
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
