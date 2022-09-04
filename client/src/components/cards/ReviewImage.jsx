import React from 'react';

import ReviewImageModal from '../modals/ReviewImageModal.jsx';

export default class ReviewImage extends React.Component {

  // props.id - Image id
  // props.url - Image url
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      showModal: false
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.defaultSrcImage = this.defaultSrcImage.bind(this);
  }

  openImageModal() {
    this.setState({showModal: true});
  }

  closeImageModal() {
    this.setState({showModal: false});
  }

  defaultSrcImage(e) {
    this.setState({url: 'https://www.shareicon.net/data/256x256/2016/08/20/817726_close_395x512.png'});
  }

  render() {
    return (
      <div className='review-image'>
        {this.state.showModal &&
        <ReviewImageModal
          id={this.props.id}
          url={this.state.url}
          closeImageModal={this.closeImageModal}
        />}
        <img
          className='review-image-preview'
          src={this.state.url}
          loading='lazy'
          onClick={this.openImageModal}
          onError={this.defaultSrcImage}
        />
      </div>

    );
  }

}