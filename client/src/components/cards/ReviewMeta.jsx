import React from 'react';
import { Rating, LinearProgress, Skeleton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ReviewMetaCharacteristicsList from '../lists/ReviewMetaCharacteristicsList.jsx';
import ReviewMetaStarBreakdown from '../cards/ReviewMetaStarBreakdown.jsx';

const ReviewMeta = ({reviewMeta, productId, filterByRating, paletteMap, characteristicChart}) => {

  let averageRating = 0;
  let totalReviews = 0;
  let totalStars = 0;

  if (reviewMeta) {
    for (let key in reviewMeta.ratings) {
      let numValue = parseInt(reviewMeta.ratings[key]);
      let starValue = parseInt(key);
      totalReviews += numValue;
      totalStars += starValue * numValue;
    }
    averageRating = totalStars / totalReviews;
  }

  return (
    <div className='review-meta'>
      {!reviewMeta ? <Skeleton sx={{mt: 1}} variant="rectangular" height='100px'/>
        :
        <div className='review-meta-topbar'>
          <div className='review-meta-avg-rating'>
            <div id='review-meta-avg-rating-number'>{averageRating.toFixed(1)}</div>
            <div className='review-meta-avg-rating-stars-amount'>
              <Rating
                sx={{
                  color: paletteMap[Math.round(averageRating)]
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
      }
      <ReviewMetaStarBreakdown reviewMeta={reviewMeta} filterByRating={filterByRating} totalReviews={totalReviews}/>
      <ReviewMetaCharacteristicsList reviewMeta={reviewMeta} characteristicChart={characteristicChart}/>
    </div>
  );

};

export default ReviewMeta;
