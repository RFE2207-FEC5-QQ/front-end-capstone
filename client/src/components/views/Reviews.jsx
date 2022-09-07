import React from 'react';
import axios from 'axios';

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

const paletteMap = {
  '1': '#ff3333',
  '2': '#ff9966',
  '3': '#dfcc97',
  '4': '#66cce6',
  '5': '#90ee90'
};

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // // DEBUG - Using sample review
      // reviews: [
      //   {
      //     'review_id': 1275440,
      //     'rating': 5,
      //     'summary': 'This is a summary...',
      //     'recommend': true,
      //     'response': 'Hey just responding to your review, we love it!',
      //     'body': 'Let me tell you about being a cat, it isn\'t always great! Consectetur voluptate sit cillum in occaecat sit. Commodo ipsum ad adipisicing adipisicing. Cupidatat non esse elit proident duis incididunt laborum. Laboris eiusmod in pariatur. Excepteur sint occaecat ullamco cillum ea minim deserunt. Officia labore id sunt consectetur amet eiusmod. Mollit do nisi ipsum aute. Laborum eiusmod occaecat sunt enim enim laborum.',
      //     'date': '2022-07-15T00:00:00.000Z',
      //     'reviewer_name': 'An Actual Real Life Cat',
      //     'helpfulness': 2,
      //     'photos': [
      //       {
      //         'id': 2455345,
      //         'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
      //       },
      //       {
      //         'id': 1111111,
      //         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      //       },
      //       {
      //         'id': 1111112,
      //         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      //       },
      //       {
      //         'id': 1111113,
      //         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      //       },
      //       {
      //         'id': 2455346,
      //         'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
      //       }
      //     ]
      //   }
      // ],
      // // DEBUG - Using sample review meta
      // reviewMeta: {
      //   'product_id': '37311',
      //   'ratings': {
      //     '1': '10',
      //     '2': '20',
      //     '3': '30',
      //     '4': '40',
      //     '5': '50'
      //   },
      //   'recommended': {
      //     'false': '75',
      //     'true': '75'
      //   },
      //   'characteristics': {
      //     'Fit': {
      //       'id': 125031,
      //       'value': '1.2'
      //     },
      //     'Length': {
      //       'id': 125032,
      //       'value': '3'
      //     },
      //     'Comfort': {
      //       'id': 125033,
      //       'value': '4'
      //     },
      //     'Quality': {
      //       'id': 125034,
      //       'value': '5'
      //     }
      //   }
      // },
      reviews: [],
      sort: 'relevant',
      page: 1,
      filter: {},
      showReviewModal: false
    };
    this.count = 2; // Changed this to non-state property
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
    this.resetRatingFilter = this.resetRatingFilter.bind(this);
  }

  handleSortChange(e) {
    // After state is set, use getReviews as a callback to get sorted list of reviews
    this.setState({sort: e.target.value}, this.getReviews);
  }

  handleMoreReviews() {
    this.count += 2;
    this.getReviews();
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

  resetRatingFilter() {
    let filter = this.state.filter;
    if (filter['rating']) {
      delete filter['rating'];
      this.setState({filter}, this.getReviews);
    }
  }


  getReviews() {
    return axios.get('/reviews', {
      params: {
        productId: this.props.productId,
        sort: this.state.sort,
        count: this.count,
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

  openReviewModal() {
    this.setState({showReviewModal: true});
  }

  closeReviewModal() {
    this.setState({showReviewModal: false});
  }

  componentDidMount() {
    this.getReviews();
  }

  componentDidUpdate(prevProps) {
    if (this.props.productId !== prevProps.productId) {
      this.getReviews();
    }
  }

  render() {
    return (
      <div id='reviews' className='reviews-view'>
        <h1 id='reviews-title'>{'Ratings & Reviews'}</h1>
        <div className='reviews-panels'>
          <ReviewMeta
            reviewMeta={this.props.reviewMeta}
            filter={this.state.filter}
            filterByRating={(ratingStars) => this.setFilter('rating', parseInt(ratingStars))}
            resetRatingFilter={this.resetRatingFilter}
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
            paletteMap={paletteMap}
          />
          {this.state.showReviewModal &&
          <ReviewFormModal
            metaCharacteristics={this.props.reviewMeta.characteristics}
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