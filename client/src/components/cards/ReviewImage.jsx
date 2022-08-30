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
    this.toggleImageModal = this.toggleImageModal.bind(this);
  }

  toggleImageModal() {
    this.setState({showModal: !this.state.showModal});
  }

  render() {
    return (
      <div>
        {this.state.showModal &&
        <ReviewImageModal key={this.state.id} id={this.state.id} url={this.state.url}/>}
        <img
          className='review-img'
          src={this.state.url}
          loading='lazy'
          onClick={this.toggleImageModal}
        />
      </div>

    );
  }

}