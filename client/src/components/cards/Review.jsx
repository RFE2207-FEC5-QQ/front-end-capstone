import React from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


const Review = ({review, getReviews, ratingTheme, paletteMap}) =>{

  // TODO: Only allow someone to mark a review as helpful once
  // Cache session with cookies to get their marked reviews
  const markHelpful = () => {
    axios.put('/reviews/helpful', {
      reviewId: review.review_id
    })
      .then((success) => {
        getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reportReview = () => {
    axios.put('/reviews/report', {
      reviewId: review.review_id
    })
      .then((success) => {
        getReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='review'>
      <div className='review-topline'>
        <span className='review-rating'>
          <Rating
            sx={{
              color: paletteMap[review.rating][1]
            }}
            name="rating"
            value={review.rating}
            readOnly
          />
        </span>
        <div className='review-name-date'>
          <span className='review-name'>{review.reviewer_name}</span>
          <span className='review-date'>{new Date(review.date).toDateString()}</span>
        </div>
      </div>
      <p className='review-summary'>{review.summary}</p>
      <p className='review-body'>{review.body}</p>
      {review.photos.length > 0 &&
        <div className='review-images'>
          {review.photos.map((photo) => {
            return (
              <img
                className='review-img'
                key={photo.id}
                src={photo.url}
                loading='lazy'
              />
            );
          })}
        </div>
      }
      {review.recommend && (
        <span className='review-recommended'>
          <CheckIcon/>
          <span>I recommend this product</span>
        </span>
      )}
      <div className='review-bottomline'>
        <span className='review-helpful'>
          <span id='helpful-text' onClick={markHelpful}>Helpful</span> ({review.helpfulness})
        </span>
        <span> | </span>
        <span className='review-report'>
          <span id='report-text' onClick={reportReview}>Report</span>
        </span>
      </div>
    </div>
  );

};

export default Review;
