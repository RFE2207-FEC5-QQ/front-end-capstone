import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import ReviewForm from '../forms/ReviewForm.jsx';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
const ReviewFormModal = ({closeReviewModal, productId}) => {

  return (
    <div className='review-form-modal'>
      <Dialog open={true} onClose={closeReviewModal}>
        <DialogContent>
          <ReviewForm postSubmit={closeReviewModal} productId={productId}/>
        </DialogContent>
        <DialogActions>
          <button onClick={closeReviewModal}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewFormModal;
