import React, { useState } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ReviewImage from '../cards/ReviewImage.jsx';

const Review = ({review, getReviews, ratingTheme, paletteMap}) => {

  const [showImageModal, setShowImageModal] = useState(false);

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
              <ReviewImage id={photo.id} url={photo.url} key={photo.id}/>
            );
          })}
        </div>
      }
      {review.recommend && (
        <div className='review-recommended'>
          <CheckIcon/>
          <div>I recommend this product</div>
        </div>
      )}
      {review.response && (
        <div className='review-response'>
          <p><b>Response:</b></p>
          <p>{review.response}</p>
        </div>
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
