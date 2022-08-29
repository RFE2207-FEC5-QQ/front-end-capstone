import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ReviewList from '../lists/ReviewList.jsx';
import ReviewMeta from '../cards/ReviewMeta.jsx';

const Reviews = () => {

  const characteristicChart = {
    Size: {
      1: 'A size too small',
      2: '1/2 a size too small',
      3: 'Perfect',
      4: '1/2 a size too big',
      5: 'A size too wide'
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide'
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect'
    },
    Quality: {
      1: 'Poor',
      2: 'Below average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect'
    },
    Length: {
      1: 'Runs short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long'
    }
  };

  const ratingTheme = createTheme({
    palette: {
      primary: {
        main: '#333333',
      },
      neutral: {
        main: '#dfcc97',
      },
      success: {
        main: '#90ee90',
      },
    },
  });

  const paletteMap = {
    '1': ['error', '#ff3333'],
    '2': ['warning', '#ff9966'],
    '3': ['neutral', '#dfcc97'],
    '4': ['info', '#66cce6'],
    '5': ['success', '#90ee90']
  };

  return (
    <div className='reviews-view'>
      <h2>{'Ratings & Reviews'}</h2>
      <div className='reviews-panels'>
        <ReviewMeta ratingTheme={ratingTheme} paletteMap={paletteMap} characteristicChart={characteristicChart}/>
        <ReviewList ratingTheme={ratingTheme} paletteMap={paletteMap}/>
      </div>
    </div>
  );

};

export default Reviews;
