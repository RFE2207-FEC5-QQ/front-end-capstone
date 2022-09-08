import React from 'react';

import { InputLabel, MenuItem, FormControl, Skeleton, Button, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import Review from '../cards/Review.jsx';

const ReviewList = ({reviews, productId, sort, getReviews, removeReview, openReviewModal, handleSortChange, handleMoreReviews, atListEnd}) => {

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
      {reviews.length === 0 ? <Skeleton sx={{mt: 2}} variant='rectangular' height='620px'/>
        :
        <div className='review-list-entries'>
          {reviews.map((review, index) => (
            <Review review={review} productId={productId} removeReview={removeReview} reviewIndex={index} key={review.review_id}/>
          ))}
        </div>
      }
      {reviews.length === 0 ? <Skeleton variant='rectangular' height='100px'/>
        :
        <div className='review-buttons'>
          <Button hidden={atListEnd} onClick={handleMoreReviews}>More Reviews</Button> <Button onClick={openReviewModal}>Add a Review +</Button>
        </div>
      }
    </div>
  );

};

export default ReviewList;
