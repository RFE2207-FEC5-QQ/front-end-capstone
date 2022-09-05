import React from 'react';
import { LinearProgress, Skeleton } from '@mui/material';

const ReviewMetaStarBreakdown = ({reviewMeta, filterByRating, totalReviews}) => {

  return (
    <div className='review-meta-avg-rating-breakdown'>
      <h2 className='review-meta-title'>Rating Breakdown</h2>
      {/* {TODO: ADD 'FILTERS APPLIED' SECTION} */}
      {!reviewMeta ? <Skeleton variant="rectangular" height='200px'/>
        :
        Object.keys(reviewMeta.ratings).map((key) => (
          <div key={key} className='review-meta-avg-rating-breakdown-entry' onClick={() => filterByRating(key)}>
            <div className='review-meta-avg-rating-breakdown-stars'>
              {`${key} ${key === '1' ? 'star' : 'stars'} (${reviewMeta.ratings[key]})`}
            </div>
            <div className='review-meta-avg-rating-breakdown-bar'>
              <LinearProgress
                sx={{
                  bgcolor: '#333333',
                  p: 0.3
                }}
                variant='determinate'
                value={(parseInt(reviewMeta.ratings[key]) / totalReviews) * 100}
                color={'success'}
              />
            </div>
          </div>
        ))
      }
    </div>
  );

};

export default ReviewMetaStarBreakdown;
