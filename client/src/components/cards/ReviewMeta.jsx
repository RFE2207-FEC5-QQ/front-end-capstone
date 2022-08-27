import React from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';

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
          '2': '50',
          '3': '50',
          '4': '50',
          '5': '50'
        },
        'recommended': {
          'false': '125',
          'true': '125'
        },
        'characteristics': {
          'Fit': {
            'id': 125031,
            'value': '3.1000000000000000'
          },
          'Length': {
            'id': 125032,
            'value': '3.1881188118811881'
          },
          'Comfort': {
            'id': 125033,
            'value': '3.2689393939393939'
          },
          'Quality': {
            'id': 125034,
            'value': '3.3507462686567164'
          }
        }
      }
    };
    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
  }

  getAverageRating() {
    let ratings = this.state.reviewMeta.ratings;
    let totalReviews = 0;
    let totalStars = 0;
    for (let key in ratings) {
      let numValue = parseInt(ratings[key]);
      let starValue = parseInt(key);
      totalReviews += numValue;
      totalStars += starValue * numValue;
    }
    let averageRating = totalStars / totalReviews;
    console.log(averageRating);
    return averageRating;
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
    let rating = this.getAverageRating();
    return (
      <div className='review-meta'>
        <span className='review-meta-avg-rating'>
          <span id='review-meta-avg-rating-number'>{rating.toFixed(1)}</span>
          <Rating
            name="avg-rating"
            value={rating}
            precision={0.25}
            readOnly
          />
        </span>
        {Object.keys(this.state.reviewMeta).map((key, index, collection) => (
          <p key={key}>{key}: {JSON.stringify(this.state.reviewMeta[key])}</p>
        ))}
      </div>
    );
  }

}

export default ReviewMeta;
