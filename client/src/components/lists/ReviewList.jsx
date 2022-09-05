import React from 'react';

import { InputLabel, MenuItem, FormControl, Skeleton } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Review from '../cards/Review.jsx';

const ReviewList = ({reviews, sort, getReviews, openReviewModal, handleSortChange, handleMoreReviews, ratingTheme, paletteMap}) => {

  console.log('reviews', reviews); // DEBUG

  return (
    <div className='review-list'>
      <div className='review-list-top'>
        {`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}, sorted by `}
        <Select
          variant="standard"
          labelId="sort-select-label"
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
          label="Sort"
        >
          <MenuItem value={'newest'}>newest</MenuItem>
          <MenuItem value={'helpful'}>helpful</MenuItem>
          <MenuItem value={'relevant'}>relevance</MenuItem>
        </Select>
      </div>
      {reviews.length === 0 ? <Skeleton sx={{mt: 2}} variant='rectangular' height='500px'/>
        :
        <div className='review-list-entries'>
          {reviews.map((review) => (
            <Review review={review} getReviews={getReviews} paletteMap={paletteMap} key={review.review_id}/>
          ))}
        </div>
      }
      {reviews.length === 0 ? <Skeleton variant='rectangular' height='100px'/>
        :
        <div className='review-buttons'>
          <button onClick={handleMoreReviews}>More Reviews</button> <button onClick={openReviewModal}>Add a Review +</button>
        </div>
      }
    </div>
  );

};

export default ReviewList;
