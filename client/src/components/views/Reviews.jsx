import React from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      reviews: []
    };
  }

  getReviews() {
    axios.get('/reviews', {params: {'product_id': this.state.productId}})
      .then((success) => {
        this.setState({reviews: success.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log('reviews', reviews);
    return (
      <div className='view-reviews'>
      </div>
    );
  }

}

export default Reviews;
