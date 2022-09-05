import React, { useState } from 'react';
import axios from 'axios';
import { Rating, Divider, Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import ReviewImage from '../cards/ReviewImage.jsx';

const Review = ({review, paletteMap}) => {

  const [reviewBodyExpanded, setReviewBodyExpanded] = useState(false);
  const [markedHelpful, setMarkedHelpful] = useState(false);
  const [helpfulRating, setHelpfulRating] = useState(review.helpfulness);
  const [reported, setReported] = useState(false);

  if (reported) { return null; }

  // TODO: Only allow someone to mark a review as helpful once
  // Cache session with cookies to get their marked reviews
  const markHelpful = () => {
    axios.put('/reviews/helpful', {
      reviewId: review.review_id
    })
      .then((success) => {
        setMarkedHelpful(true);
        setHelpfulRating(helpfulRating + 1);
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
        setReported(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleReviewBodyExpanded = () => {
    setReviewBodyExpanded(!reviewBodyExpanded);
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
          <span className='review-date'>{function() {
            let date = new Date(review.date).toDateString().split(' ');
            return date.slice(1, date.length).join(' ');
          }()}
          </span>
        </div>
      </div>
      <p className='review-summary'>
        {review.summary.slice(0, 60)}
      </p>
      {review.body.length < 250 ? <div className='review-body-short'>{review.body.slice(0, 1000)}</div> :
        <div className='review-body-long'>
          {reviewBodyExpanded ? review.body.slice(0, 1000) : review.body.slice(0, 250) + '...'}
          <Divider>
            <Chip
              sx={{
                mt: 1,
                mb: 1
              }}
              label={reviewBodyExpanded ? 'Show less' : 'Show more'}
              onClick={toggleReviewBodyExpanded}
              variant={reviewBodyExpanded ? 'outlined' : 'solid'}
            />
          </Divider>
        </div>
      }
      {review.photos.length > 0 &&
        <div className='review-images'>
          {review.photos.slice(0, 5).map((photo) => {
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
          {markedHelpful ?
            <span id='helpful-text'><i>Rated Helpful</i>{` (${helpfulRating})`}</span>
            :
            <span id='helpful-text' onClick={markHelpful}><u>Helpful</u>{` (${helpfulRating})`}</span>
          }
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
