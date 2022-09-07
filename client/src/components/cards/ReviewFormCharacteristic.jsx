import React, { useState } from 'react';
import { Slider } from '@mui/material';

const ReviewFormCharacteristic = ({metaCharacteristics, characteristic, characteristics, characteristicChart, onCharValueChange}) => {

  return (
    <div className='review-form-characteristics-entry'>
      {characteristic}
      <Slider
        sx={{
          padding: 0
        }}
        min={1}
        max={5}
        marks
        valueLabelDisplay="off"
      />
      {/* <div className='review-meta-characteristic-labels'>
        <span id='review-meta-characteristic-left'>{characteristicChart[char][1]}</span>
        <span id='review-meta-characteristic-right'>{characteristicChart[char][5]}</span>
      </div> */}
      {Object.keys(characteristicChart[characteristic]).map((key) => (
        <div key={`${characteristic.toLowerCase()}-${key}`} className='review-form-characteristics-entry-value'>
          <label>
            <input
              type='radio'
              name={`characteristic-${characteristic.toLowerCase()}-${key}`}
              value={key}
              checked={characteristics[metaCharacteristics[characteristic].id] === parseInt(key)}
              onChange={(e) => {
                onCharValueChange(characteristic, e.target.value);
              }}
            />
            {characteristicChart[characteristic][key]}
          </label>
        </div>
      ))}
    </div>
  );

};

export default ReviewFormCharacteristic;
