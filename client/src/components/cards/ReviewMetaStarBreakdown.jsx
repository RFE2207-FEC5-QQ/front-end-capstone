import React from 'react';
import { LinearProgress, Skeleton, Rating, Button } from '@mui/material';

const ReviewMetaStarBreakdown = ({reviewMeta, filter, filterByRating, resetRatingFilter, totalReviews, darkMode}) => {

  return (
    <div className='review-meta-avg-rating-breakdown'>
      <h2 className='review-meta-title'>Rating Breakdown</h2>
      {/* {TODO: ADD 'FILTERS APPLIED' SECTION} */}
      {filter['rating'] &&
        <div className='review-meta-filters'>
          <Button onClick={() => resetRatingFilter()}>Remove All Filters</Button>
          <div id='review-meta-filters-title'>
            {filter['rating'].length === 1 ? 'Filter Applied' : 'Filters Applied'}
          </div>
          {
            function() {
              let filtersSorted = filter['rating'].slice().sort();
              return filtersSorted.map((value) => {
                return (
                  <div className='review-meta-filters-entry' key={`${value}-star-filter`}>
                    <Button onClick={() => filterByRating(value)}>x</Button>
                    <Rating
                      sx={{
                        color: darkMode ? 'rgba(230, 230, 230, 0.87)' : '#000000'
                      }}
                      name="rating"
                      value={value}
                      readOnly
                    />
                  </div>
                );
              });
            }()
          }
        </div>
      }

      {!reviewMeta ? <Skeleton variant="rectangular" height='200px'/>
        :
        Object.keys(reviewMeta.ratings).map((key) => (
          <div key={key} className='review-meta-avg-rating-breakdown-entry' onClick={() => filterByRating(key)}>
            <div className='review-meta-avg-rating-breakdown-stars'>
              {`${key} ${key === '1' ? 'Star' : 'Stars'} (${reviewMeta.ratings[key]})`}
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
