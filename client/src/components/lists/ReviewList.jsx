import React from 'react';

import { InputLabel, MenuItem, FormControl } from '@mui/material';
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
      <div className='review-list-entries'>
        {
          reviews.length === 0 ? 'Reviews Not Found' : reviews.map((review) => (
            <Review review={review} getReviews={getReviews} ratingTheme={ratingTheme} paletteMap={paletteMap} key={review.review_id}/>
          ))
        }
        <div className='review-buttons'>
          <button onClick={handleMoreReviews}>More Reviews</button> <button onClick={openReviewModal}>Add a Review +</button>
        </div>
      </div>
    </div>
  );

};

export default ReviewList;
