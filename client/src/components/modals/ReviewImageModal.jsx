import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default class ReviewImageModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      url: this.props.url
    };
    this.exitModal = this.exitModal.bind(this);
  }

  exitModal(e) {
    e.preventDefault();
    this.props.closeImageModal();
  }

  render() {
    return (
      <div className='review-image-modal'>
        <Dialog open={true} onClose={this.exitModal}>
          <DialogContent>
            <img
              src={this.state.url}
              style={{ width: '100%'}}
            />
          </DialogContent>
          <DialogActions>
            <button onClick={this.exitModal}>Close</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}