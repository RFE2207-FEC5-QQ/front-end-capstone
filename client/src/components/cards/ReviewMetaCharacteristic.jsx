import React from 'react';
import { LinearProgress, Slider } from '@mui/material';

const ReviewMetaCharacteristic = ({char, characteristics, characteristicChart}) => {

  return (
    <div className='review-meta-characteristics-entry'>
      <div className='review-meta-characteristics-labels'>
        <span id='review-meta-characteristic-left'>{characteristicChart[char][1]}</span>
        <span id='review-meta-characteristic-center'>{char}</span>
        <span id='review-meta-characteristic-right'>{characteristicChart[char][5]}</span>
      </div>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" disabled={true}/>
      {/* <LinearProgress
        sx={{
          p: 0.6
        }}
        variant='determinate'
        value={((parseFloat(characteristics[char]['value']) - 1) / 4) * 100}
      /> */}
    </div>
  );

};

export default ReviewMetaCharacteristic;
