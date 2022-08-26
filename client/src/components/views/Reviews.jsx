import React from 'react';
import axios from 'axios';

import Review from '../cards/Review.jsx';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      // DEBUG - Using sample review
      reviews: [
        {
          'review_id': 1275440,
          'rating': 5,
          'summary': 'Chester B Arthur',
          'recommend': true,
          'response': null,
          'body': 'man do i hate stuff about cats, they are the worst',
          'date': '2022-07-15T00:00:00.000Z',
          'reviewer_name': 'cat',
          'helpfulness': 2,
          'photos': [
            {
              'id': 2455345,
              'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
            }
          ]
        }
      ],
      sort: 'newest'
    };
    this.getReviews = this.getReviews.bind(this);
    this.postReview = this.postReview.bind(this);

  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        productId: this.state.productId,
        sort: this.state.sort
      }
    })
      .then((success) => {
        this.setState({reviews: success.data.results});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postReview() {
    // DEBUG - Using test values
    axios.post('/reviews', {
      productId: 37311,
      rating: 5,
      summary: 'Just so great',
      body: 'Seriously just the best piece of clothing in my wardrobe. Would give 6 stars if I could!',
      recommend: true,
      name: 'Ryan',
      email: 'ryan@example.com',
      photos: ['https://i.imgur.com/EPHb3G6.jpeg'],
      characteristics: {}
    })
      .then((success) => {
        console.log('POST success!'); // DEBUG
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // DEBUG - Uncomment to get reviews on mount
    // this.getReviews();
  }

  render() {
    console.log('reviews', this.state.reviews);
    return (
      <div className='view-reviews'>
        {
          this.state.reviews.length === 0 ? 'Reviews Not Found' : this.state.reviews.map((review) => {
            return <Review review={review} getReviews={this.getReviews} key={review.review_id}/>;
          })
        }
      </div>
    );
  }

}

export default Reviews;
