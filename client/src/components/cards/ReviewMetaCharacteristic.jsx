import React, { useState } from 'react';
import { Slider } from '@mui/material';

const ReviewMetaCharacteristic = ({char, characteristics, characteristicChart}) => {

  return (
    <div className='review-meta-characteristics-entry'>
      <div className='review-meta-characteristic-labels'>
        <span id='review-meta-characteristic-title'>{char}</span>
      </div>
      <Slider
        sx={{
          padding: 0
        }}
        value={Number(parseFloat(characteristics[char]['value']).toFixed(1))}
        min={1}
        max={5}
        marks
        disabled={true}
        valueLabelDisplay="off"
      />
      <div className='review-meta-characteristic-labels'>
        <span id='review-meta-characteristic-left'>{characteristicChart[char][1]}</span>
        <span id='review-meta-characteristic-right'>{characteristicChart[char][5]}</span>
      </div>
    </div>
  );

};

export default ReviewMetaCharacteristic;
