import React from 'react';
import axios from 'axios';
import { Rating, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ReviewMeta = ({reviewMeta, productId, filterbyRating, paletteMap, characteristicChart}) => {

  if (!reviewMeta) {
    return null;
  }

  let totalReviews = 0;
  let totalStars = 0;
  for (let key in reviewMeta.ratings) {
    let numValue = parseInt(reviewMeta.ratings[key]);
    let starValue = parseInt(key);
    totalReviews += numValue;
    totalStars += starValue * numValue;
  }
  let averageRating = totalStars / totalReviews;

  return (
    <div className='review-meta'>
      <div className='review-meta-topbar'>
        <div className='review-meta-avg-rating'>
          <div id='review-meta-avg-rating-number'>{averageRating.toFixed(1)}</div>
          <div className='review-meta-avg-rating-stars-amount'>
            <Rating
              sx={{
                color: paletteMap[Math.round(averageRating)][1]
              }}
              name='avg-rating'
              value={averageRating}
              precision={0.25}
              readOnly
            />
            <div id='review-meta-total-rating-count'>
              {totalReviews} Ratings
            </div>
          </div>
        </div>
        <div className='review-meta-recommended'>
          <CheckCircleIcon fontSize='large'/>
          {(parseInt(reviewMeta.recommended.true) / (parseInt(reviewMeta.recommended.true) + parseInt(reviewMeta.recommended.false)) * 100).toFixed(0)}%
        </div>
      </div>
      <div className='review-meta-avg-rating-breakdown'>
        <h2>Rating Breakdown</h2>
        {Object.keys(reviewMeta.ratings).map((key) => (
          <div key={key} className='review-meta-avg-rating-breakdown-entry' onClick={() => filterbyRating(key)}>
            <div className='review-meta-avg-rating-breakdown-stars'>
              <span id='review-meta-avg-rating-breakdown-stars-amount'>
                <Rating
                  // sx={{
                  //   color: paletteMap[key][1]
                  // }}
                  name={`${key} stars`}
                  value={parseInt(key)}
                  readOnly
                  size='small'
                />
              </span>
              <span id='review-meta-avg-rating-breakdown-stars-count'>({reviewMeta.ratings[key]})</span>
            </div>
            <span className='review-meta-avg-rating-breakdown-bar'>
              <LinearProgress
                sx={{
                  bgcolor: '#333333',
                  p: 0.3
                }}
                variant='determinate'
                value={(parseInt(reviewMeta.ratings[key]) / totalReviews) * 100}
                color={'success'}
              />
            </span>
          </div>
        ))}
      </div>
      <div className='review-meta-characteristics'>
        {Object.keys(reviewMeta.characteristics).map((key) => (
          <div key={key} className='review-meta-characteristics-entry'>
            <div className='review-meta-characteristics-labels'>
              <span id='review-meta-characteristic-left'>{characteristicChart[key][1]}</span>
              <span id='review-meta-characteristic-center'>{key}</span>
              <span id='review-meta-characteristic-right'>{characteristicChart[key][5]}</span>
            </div>
            <LinearProgress
              sx={{
                p: 0.6
              }}
              variant='determinate'
              value={((parseFloat(reviewMeta.characteristics[key]['value']) - 1) / 4) * 100}
            />
          </div>
        ))}
      </div>
    </div>
  );

};

export default ReviewMeta;
