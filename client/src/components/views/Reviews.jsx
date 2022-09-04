import React from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ReviewList from '../lists/ReviewList.jsx';
import ReviewMeta from '../cards/ReviewMeta.jsx';
import ReviewFormModal from '../modals/ReviewFormModal.jsx';

const characteristicChart = {
  Size: {
    1: 'A size too small',
    2: '1/2 a size too small',
    3: 'Perfect',
    4: '1/2 a size too big',
    5: 'A size too wide'
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide'
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect'
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect'
  },
  Length: {
    1: 'Runs short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  }
};

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

const paletteMap = {
  '1': ['error', '#ff3333'],
  '2': ['warning', '#ff9966'],
  '3': ['neutral', '#dfcc97'],
  '4': ['info', '#66cce6'],
  '5': ['success', '#90ee90']
};

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      reviewMeta: null,
      sort: 'relevant',
      count: 2,
      page: 1,
      filter: {},
      showReviewModal: false
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);

  }

  handleSortChange(e) {
    // After state is set, use getReviews as a callback to get sorted list of reviews
    this.setState({sort: e.target.value}, this.getReviews);
  }

  handleMoreReviews() {
    // After state is set, use getReviews as a callback to get list of reviews
    this.setState({count: this.state.count + 2}, this.getReviews);
  }

  setFilter(key, value) {
    let filter = this.state.filter;
    if (filter[key]) { // If filter key exists
      let index = filter[key].indexOf(value);
      if (index !== -1) { // If this specific filter - value pair is found, toggle it off
        filter[key].splice(index, 1);
        if (filter[key].length === 0) {
          delete filter[key]; // If filter key has no values after toggling off, remove this filter key from object
        }
      } else { // If this filter - value pair is not found, add it to the filters
        filter[key].push(value);
      }
    } else { // If the filter key does not exist, add this filter - value pair
      filter[key] = [value];
    }
    // After state is set, use getReviews as a callback to get filtered list of reviews
    this.setState({filter}, this.getReviews);
  }

  getReviews() {
    return axios.get('/reviews', {
      params: {
        productId: this.props.productId,
        sort: this.state.sort,
        count: this.state.count,
        page: this.state.page
      }
    })
      .then((success) => {
        let reviews = success.data.results;
        let filter = this.state.filter;
        // Additive filters
        if (Object.keys(filter).length > 0) {
          let filteredReviews = [];
          for (let review of reviews) {
            let match = true;
            for (let key in filter) {
              if (filter[key].length !== 0 && !filter[key].includes(review[key])) {
                match = false;
                break;
              }
            }
            if (match) {
              filteredReviews.push(review);
            }
          }
          reviews = filteredReviews;
        }
        this.setState({reviews});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getReviewMeta() {
    axios.get('/reviews/meta', {
      params: {
        productId: this.props.productId
      }
    })
      .then((success) => {
        this.setState({reviewMeta: success.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openReviewModal() {
    this.setState({showReviewModal: true});
  }

  closeReviewModal() {
    this.setState({showReviewModal: false});
  }

  componentDidMount() {
    this.getReviews();
    this.getReviewMeta();
  }


  render() {
    return (
      <div id='reviews' className='reviews-view'>
        <h2>{'Ratings & Reviews'}</h2>
        <div className='reviews-panels'>
          <ReviewMeta
            reviewMeta={this.state.reviewMeta}
            productId={this.props.productId}
            filterbyRating={(ratingStars) => this.setFilter('rating', parseInt(ratingStars))}
            paletteMap={paletteMap}
            characteristicChart={characteristicChart}
          />
          <ReviewList
            reviews={this.state.reviews}
            sort={this.state.sort}
            getReviews={this.getReviews}
            openReviewModal={this.openReviewModal}
            handleSortChange={this.handleSortChange}
            handleMoreReviews={this.handleMoreReviews}
            ratingTheme={ratingTheme}
            paletteMap={paletteMap}
          />
          {this.state.showReviewModal &&
          <ReviewFormModal
            metaCharacteristics={this.state.reviewMeta.characteristics}
            characteristicChart={characteristicChart}
            productId={this.props.productId}
            closeReviewModal={this.closeReviewModal}
            paletteMap={paletteMap}
          />}
        </div>
      </div>
    );
  }

}

export default Reviews;
