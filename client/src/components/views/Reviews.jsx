import React from 'react';
import axios from 'axios';

import Review from '../cards/Review.jsx';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      reviews: [],
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
    this.getReviews();
  }

  render() {
    console.log('reviews', this.state.reviews);
    return (
      <div className='view-reviews'>
        {
          this.state.reviews.length === 0 ? 'Reviews Not Found' : this.state.reviews.map((review) => {
            return <Review review={review} key={review.review_id}/>;
          })
        }
      </div>
    );
  }

}

export default Reviews;
