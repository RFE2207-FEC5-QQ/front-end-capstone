import React from 'react';

import ReviewImageModal from '../modals/ReviewImageModal.jsx';

export default class ReviewImage extends React.Component {

  // props.id - Image id
  // props.url - Image url
  // props.errorResponse - What to bubble up on the event an image URL is invalid
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      invalidUrl: false,
      urlChecked: false,
      showModal: false
    };
    this.openImageModal = this.openImageModal.bind(this);
    this.closeImageModal = this.closeImageModal.bind(this);
    this.defaultSrcImage = this.defaultSrcImage.bind(this);
    this.handleError = this.handleError.bind(this);
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

  handleError(e) {
    this.setState({invalidUrl: true});
    this.props.errorResponse();
  }

  render() {
    if (!this.state.urlChecked) {
      return (
        <img
          src={this.state.url}
          hidden={!this.state.urlChecked}
          loading='eager'
          onLoad={() => this.setState({
            urlChecked: true
          })}
          onError={() => this.handleError()}
        />
      );
    }
    if (this.state.invalidUrl) {
      return null;
    }
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
        />
      </div>
    );
  }

}