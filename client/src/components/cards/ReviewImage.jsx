import React from 'react';

import ReviewImageModal from '../modals/ReviewImageModal.jsx';

export default class ReviewImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      url: this.props.url,
      showModal: false
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
  }

  openImageModal(e) {
    this.setState({showModal: true});
  }

  closeImageModal(e) {
    this.setState({showModal: false});
  }

  render() {
    return (
      <div className='review-image'>
        {this.state.showModal &&
        <ReviewImageModal
          id={this.state.id}
          url={this.state.url}
          closeImageModal={this.closeImageModal}
        />}
        <img
          className='review-image-preview'
          src={this.state.url}
          loading='lazy'
          onClick={this.openImageModal}
        />
      </div>

    );
  }

}