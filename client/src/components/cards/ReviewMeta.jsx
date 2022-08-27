import React from 'react';
import axios from 'axios';
import { Rating, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RecommendIcon from '@mui/icons-material/Recommend';

const ratingTheme = createTheme({
  palette: {
    primary: {
      main: '#333333',
    },
    neutral: {
      main: '#dfcc97',
    },
    success: {
      main: '#90ee90',
    },
  },
});

class ReviewMeta extends React.Component {

  // TODO: Get lowest and highest values for each characteristic, i.e 'Too small' 'Too large' for Fit
  // Will likely require me to have a list of all characteristics, need to look into how to query that
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
    this.paletteMap = {
      '1': ['error', '#ff3333'],
      '2': ['warning', '#ff9966'],
      '3': ['neutral', '#dfcc97'],
      '4': ['info', '#66cce6'],
      '5': ['success', '#90ee90']
    };
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
    let highestNumValue = 0;
    for (let key in this.state.reviewMeta.ratings) {
      let numValue = parseInt(this.state.reviewMeta.ratings[key]);
      if (numValue > highestNumValue) {
        highestNumValue = numValue;
      }
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
              name='avg-rating'
              value={averageRating}
              precision={0.25}
              readOnly
            />
          </div>
          <div className='review-meta-recommended'>
            <RecommendIcon fontSize='large'/>
            {(parseInt(this.state.reviewMeta.recommended.true) / (parseInt(this.state.reviewMeta.recommended.true) + parseInt(this.state.reviewMeta.recommended.false)) * 100).toFixed(0)}%
          </div>
        </div>

        <ThemeProvider theme={ratingTheme}>
          <div className='review-meta-avg-rating-breakdown'>
            {Object.keys(this.state.reviewMeta.ratings).map((key) => (
              <div key={key} className='review-meta-avg-rating-breakdown-entry'>
                <div id='review-meta-avg-rating-breakdown-key'>
                  <Rating
                    sx={{
                      color: this.paletteMap[key][1]
                    }}
                    name={`${key} stars`}
                    value={parseInt(key)}
                    readOnly
                    size='small'
                  />
                </div>
                <LinearProgress
                  variant='determinate'
                  value={(parseInt(this.state.reviewMeta.ratings[key]) / highestNumValue) * 100}
                  color={this.paletteMap[key][0]}
                />
              </div>
            ))}
          </div>
          <div className='review-meta-characteristics'>
            {Object.keys(this.state.reviewMeta.characteristics).map((key) => (
              <div key={key} className='review-meta-characteristics-entry'>
                <div className='review-meta-labels'>
                  <span>Left</span>
                  <span id='review-meta-characteristic'>{key}</span>
                  <span>Right</span>
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
