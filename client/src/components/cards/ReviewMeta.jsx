import React from 'react';
import axios from 'axios';
import { Rating, LinearProgress } from '@mui/material';

class ReviewMeta extends React.Component {

  // TODO: Get ratings average
  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      // DEBUG - Using sample review meta
      reviewMeta: {
        'product_id': '37311',
        'ratings': {
          '1': '50',
          '2': '30',
          '3': '50',
          '4': '50',
          '5': '55'
        },
        'recommended': {
          'false': '105',
          'true': '130'
        },
        'characteristics': {
          'Fit': {
            'id': 125031,
            'value': '3.100'
          },
          'Length': {
            'id': 125032,
            'value': '3.188'
          },
          'Comfort': {
            'id': 125033,
            'value': '3.268'
          },
          'Quality': {
            'id': 125034,
            'value': '3.350'
          }
        }
      }
    };
    this.getReviewMeta = this.getReviewMeta.bind(this);
  }

  getReviewMeta() {
    axios.get('/reviews/meta', {
      params: {
        productId: this.state.productId
      }
    })
      .then((success) => {
        this.setState({reviewMeta: success.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // DEBUG - Uncomment to get review meta on mount
    // this.getReviewMeta();
  }

  render() {
    let ratings = this.state.reviewMeta.ratings;
    let totalReviews = 0;
    let totalStars = 0;
    let highestNumValue = 0;
    for (let key in ratings) {
      let numValue = parseInt(ratings[key]);
      if (numValue > highestNumValue) {
        highestNumValue = numValue;
      }
      let starValue = parseInt(key);
      totalReviews += numValue;
      totalStars += starValue * numValue;
    }
    let averageRating = totalStars / totalReviews;
    console.log(highestNumValue);
    return (
      <div className='review-meta'>
        <div className='review-meta-avg-rating'>
          <div id='review-meta-avg-rating-number'>{averageRating.toFixed(1)}</div>
          <Rating
            name='avg-rating'
            value={averageRating}
            precision={0.25}
            readOnly
          />
        </div>
        <div>{
          (parseInt(this.state.reviewMeta.recommended.true) / (parseInt(this.state.reviewMeta.recommended.true) + parseInt(this.state.reviewMeta.recommended.false)) * 100).toFixed(0)
        }% of users recommend this product</div>
        <div className='review-meta-avg-rating-breakdown'>
          {Object.keys(this.state.reviewMeta.ratings).map((key) => (
            <div key={key} className='review-meta-avg-rating-breakdown-entry'>
              <div id='review-meta-avg-rating-breakdown-key'>
                {key + (key === '1' ? ' star' : ' stars')}
              </div>
              <LinearProgress variant="determinate" value={(parseInt(this.state.reviewMeta.ratings[key]) / highestNumValue) * 100} />
            </div>
          ))}
        </div>

        {Object.keys(this.state.reviewMeta.characteristics).map((key, index, collection) => (
          <p key={key}>{key}: {JSON.stringify(this.state.reviewMeta.characteristics[key])}</p>
        ))}
      </div>
    );
  }

}

export default ReviewMeta;
