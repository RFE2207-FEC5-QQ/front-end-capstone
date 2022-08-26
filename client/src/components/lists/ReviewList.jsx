import React from 'react';
import axios from 'axios';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Review from '../cards/Review.jsx';

class ReviewList extends React.Component {

  constructor(props) {
    super(props);
    // TODO: Add selector for number of reviews to display, page number
    this.state = {
      productId: 37311,
      // DEBUG - Using sample review
      reviews: [
        {
          'review_id': 1275440,
          'rating': 5,
          'summary': 'This is a summary...',
          'recommend': true,
          'response': null,
          'body': 'Let me tell you about being a cat, it isn\'t always great!',
          'date': '2022-07-15T00:00:00.000Z',
          'reviewer_name': 'An Actual Real Life Cat',
          'helpfulness': 2,
          'photos': [
            {
              'id': 2455345,
              'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
            },
            {
              'id': 1111111,
              'url': 'https://i.imgur.com/EPHb3G6.jpeg'
            },
            {
              'id': 1111112,
              'url': 'https://i.imgur.com/EPHb3G6.jpeg'
            },
            {
              'id': 1111113,
              'url': 'https://i.imgur.com/EPHb3G6.jpeg'
            }
          ]
        }
      ],
      sort: 'newest',
      count: 2,
      page: 1
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  handleSortChange(e) {
    // After state is set, use getReviews as a callback to get sorted list of reviews
    this.setState({sort: e.target.value}, this.getReviews);
  }

  handleMoreReviews() {
    // After state is set, use getReviews as a callback to get sorted list of reviews
    this.setState({count: this.state.count + 2}, this.getReviews);
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        productId: this.state.productId,
        sort: this.state.sort,
        count: this.state.count,
        page: this.state.page
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
    console.log('reviews', this.state.reviews); // DEBUG
    return (
      <div className='review-list'>
        <div className='review-list-top'>
          {`${this.state.reviews.length} ${this.state.reviews.length === 1 ? 'review' : 'reviews'}, sorted by `}
          <Select
            variant="standard"
            labelId="sort-select-label"
            id="sort-select"
            value={this.state.sort}
            onChange={this.handleSortChange}
            label="Sort"
          >
            <MenuItem value={'newest'}>newest</MenuItem>
            <MenuItem value={'helpful'}>helpful</MenuItem>
            <MenuItem value={'relevant'}>relevance</MenuItem>
          </Select>
        </div>
        {
          this.state.reviews.length === 0 ? 'Reviews Not Found' : this.state.reviews.map((review) => (
            <Review review={review} getReviews={this.getReviews} key={review.review_id}/>
          ))
        }
        <div className='review-buttons'>
          <button onClick={this.handleMoreReviews}>More Reviews</button> <button>Add a Review +</button>
        </div>
      </div>
    );
  }

}

export default ReviewList;
