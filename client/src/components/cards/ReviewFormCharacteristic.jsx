import React, { useState } from 'react';
import { Slider } from '@mui/material';

const ReviewFormCharacteristic = ({metaCharacteristics, characteristic, characteristics, characteristicChart, onCharValueChange, darkMode}) => {

  return (
    <div id='review-form-characteristics-entry' align='center'>
      <div className='review-meta-characteristic-labels'>
        <span id='review-form-characteristic-title'>{characteristic}</span>
      </div>
      {/* {TODO: SET DEFAULT TO NULL, ALSO NEEDS TO BE DONE IN REVIEWFORM.JSX} */}
      <Slider
        sx={{
          maxWidth: 5 / 6,
          color: '#99856f',
        }}
        min={1}
        max={5}
        defaultValue={3}
        onChangeCommitted={(e, value) => {
          onCharValueChange(characteristic, value);
        }}
        valueLabelDisplay="off"
        marks={function() {
          let characteristicValues = Object.keys(characteristicChart[characteristic]);
          let output = [];
          for (let i = 0; i < characteristicValues.length; i++) {
            if (i % 2 === 0) {
              let label = characteristicChart[characteristic][i + 1];
              output.push({value: parseInt(characteristicValues[i]), label});
            } else {
              output.push({value: parseInt(characteristicValues[i]), label: ''});
            }
          }
          return output;
        }()}
      />
    </div>
  );

};

export default ReviewFormCharacteristic;
