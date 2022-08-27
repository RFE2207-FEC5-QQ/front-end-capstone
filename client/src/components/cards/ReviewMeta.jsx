import React from 'react';
import axios from 'axios';

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
          '1': '43',
          '2': '23',
          '3': '59',
          '4': '66',
          '5': '215'
        },
        'recommended': {
          'false': '75',
          'true': '331'
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
    this.getReviewMeta();
  }

  render() {
    return (
      <div className='review-meta'>
        {Object.keys(this.state.reviewMeta).map((key, index, collection) => (
          <p>{key}: {JSON.stringify(this.state.reviewMeta[key])}</p>
        ))}
      </div>
    );
  }

}

export default ReviewMeta;
