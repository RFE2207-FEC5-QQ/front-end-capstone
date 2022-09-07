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
        // marks={function() {
        //   let array = Object.keys(characteristicChart[char]);
        //   let output = [];
        //   for (let i = 0; i < array.length; i++) {
        //     let label = '';
        //     if (Math.round(parseFloat(characteristics[char]['value'])) === parseInt(array[i])) {
        //       label = characteristicChart[char][array[i]];
        //     }
        //     output.push({value: array[i], label});
        //   }
        //   return output;
        // }()}
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
