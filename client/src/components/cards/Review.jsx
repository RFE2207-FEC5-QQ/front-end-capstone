import React from 'react';
import axios from 'axios';

class Review extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      review: props.review
    };
    this.markHelpful = this.markHelpful.bind(this);
    this.reportReview = this.reportReview.bind(this);
  }

  markHelpful() {

  }

  reportReview() {

  }

  render () {
    return (
      <div className='review'>
        <p>{this.state.review.reviewer_name}</p>
        <p>{this.state.review.date}</p>
        <p>{this.state.review.rating}</p>
        <p>{this.state.review.recommend}</p>
        <p>{this.state.review.summary}</p>
        <p>{this.state.review.body}</p>
        <p>{this.state.review.helpfulness}</p>
      </div>
    );
  }

}

export default Review;
