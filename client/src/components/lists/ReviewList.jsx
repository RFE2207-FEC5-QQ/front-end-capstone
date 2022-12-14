import React from 'react';

import { InputLabel, MenuItem, FormControl, Skeleton, Button, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

import Review from '../cards/Review.jsx';

const ReviewList = ({reviews, productId, sort, getReviews, removeReview, openReviewModal, handleSortChange, handleMoreReviews, atListEnd, darkMode}) => {

  const checkForBottom = (e) => {
    if (atListEnd) {
      return;
    }
    let targetBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 1;
    if (targetBottom) {
      handleMoreReviews();
    }
  };

  return (
    <div className='review-list'>
      <div className='review-list-top'>
        {`${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}, sorted by  `}
        <Select
          sx={{
            color: darkMode ? 'rgba(230, 230, 230, 0.87)' : '#000000',
            backgroundColor: darkMode ? '#1B1D24' : 'rgba(230, 230, 230, 0.87)',
            pl: 1
          }}
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
        <div className='review-list-entries' onScroll={checkForBottom}>
          {reviews.map((review, index) => (
            <Review review={review} productId={productId} removeReview={removeReview} reviewIndex={index} key={review.review_id}/>
          ))}
        </div>
      }
      {reviews.length === 0 ? <Skeleton variant='rectangular' height='100px'/>
        :
        <div className='review-buttons'>
          <Button
            sx={{
              display: atListEnd ? 'none' : 'inline'
            }}
            size='large'
            onClick={handleMoreReviews}
          >
            More Reviews
          </Button>
          <Button
            onClick={openReviewModal}
            size='large'
          >
            Add a Review +
          </Button>
        </div>
      }
    </div>
  );

};

export default ReviewList;
