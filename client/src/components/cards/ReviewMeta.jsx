import React from 'react';
import axios from 'axios';
import { Rating, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

class ReviewMeta extends React.Component {

  // Props:
  // characteristicChart
  // paletteMap
  // ratingTheme
  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      // DEBUG - Using sample review meta
      reviewMeta: {
        'product_id': '37311',
        'ratings': {
          '1': '10',
          '2': '20',
          '3': '30',
          '4': '40',
          '5': '50'
        },
        'recommended': {
          'false': '75',
          'true': '75'
        },
        'characteristics': {
          'Fit': {
            'id': 125031,
            'value': '2.3'
          },
          'Length': {
            'id': 125032,
            'value': '3'
          },
          'Comfort': {
            'id': 125033,
            'value': '4'
          },
          'Quality': {
            'id': 125034,
            'value': '5'
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
    let totalReviews = 0;
    let totalStars = 0;
    for (let key in this.state.reviewMeta.ratings) {
      let numValue = parseInt(this.state.reviewMeta.ratings[key]);
      let starValue = parseInt(key);
      totalReviews += numValue;
      totalStars += starValue * numValue;
    }
    let averageRating = totalStars / totalReviews;
    return (
      <div className='review-meta'>
        <div className='review-meta-topbar'>
          <div className='review-meta-avg-rating'>
            <div id='review-meta-avg-rating-number'>{averageRating.toFixed(1)}</div>
            <Rating
              sx={{
                color: this.props.paletteMap[Math.round(averageRating)][1]
              }}
              name='avg-rating'
              value={averageRating}
              precision={0.25}
              readOnly
            />
          </div>
          <div className='review-meta-recommended'>
            <CheckCircleIcon fontSize='large'/>
            {(parseInt(this.state.reviewMeta.recommended.true) / (parseInt(this.state.reviewMeta.recommended.true) + parseInt(this.state.reviewMeta.recommended.false)) * 100).toFixed(0)}%
          </div>
        </div>
        <ThemeProvider theme={this.props.ratingTheme}>
          <div className='review-meta-avg-rating-breakdown'>
            <h2>Rating Breakdown</h2>
            {Object.keys(this.state.reviewMeta.ratings).map((key) => (
              <div key={key} className='review-meta-avg-rating-breakdown-entry'>
                <div id='review-meta-avg-rating-breakdown-key'>
                  <Rating
                    // sx={{
                    //   color: this.props.paletteMap[key][1]
                    // }}
                    name={`${key} stars`}
                    value={parseInt(key)}
                    readOnly
                    size='small'
                  />
                </div>
                <LinearProgress
                  sx={{
                    bgcolor: '#333333',
                    p: 0.3,
                  }}
                  variant='determinate'
                  value={(parseInt(this.state.reviewMeta.ratings[key]) / totalReviews) * 100}
                  color={'success'}
                />
              </div>
            ))}
          </div>
          <div className='review-meta-characteristics'>
            {Object.keys(this.state.reviewMeta.characteristics).map((key) => (
              <div key={key} className='review-meta-characteristics-entry'>
                <div className='review-meta-labels'>
                  <span id='review-meta-characteristic-left'>{this.props.characteristicChart[key][1]}</span>
                  <span id='review-meta-characteristic-center'>{key}</span>
                  <span id='review-meta-characteristic-right'>{this.props.characteristicChart[key][5]}</span>
                </div>
                <LinearProgress
                  variant='determinate'
                  value={((parseInt(this.state.reviewMeta.characteristics[key]['value']) - 1) / 4) * 100}
                />
              </div>
            ))}
          </div>
        </ThemeProvider>
      </div>
    );
  }

}

export default ReviewMeta;
