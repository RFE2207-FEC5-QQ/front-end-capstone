import React from 'react';

import ReviewImageModal from '../modals/ReviewImageModal.jsx';

export default class ReviewImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
  }

  openImageModal() {
    this.setState({showModal: true});
  }

  closeImageModal() {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className='review-image'>
        {this.state.showModal &&
        <ReviewImageModal
          id={this.props.id}
          url={this.props.url}
          closeImageModal={this.closeImageModal}
        />}
        <img
          className='review-image-preview'
          src={this.props.url}
          loading='lazy'
          onClick={this.openImageModal}
        />
      </div>

    );
  }

}