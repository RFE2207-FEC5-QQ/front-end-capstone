import React from 'react';

export default class ReviewImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      url: this.props.url
    };
  }

  render() {
    return (
      <div className='review-img-modal'>
        <img src={this.state.url}/>
      </div>
    );
  }

}