import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

import ReviewForm from '../forms/ReviewForm.jsx';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
const ReviewFormModal = ({metaCharacteristics, characteristicChart, productId, closeReviewModal}) => {

  if (!metaCharacteristics) {
    return null;
  }

  return (
    <div className='review-form-modal'>
      <Dialog
        open={true}
        onClose={closeReviewModal}
      >
        <DialogContent>
          <ReviewForm
            postSubmit={closeReviewModal}
            metaCharacteristics={metaCharacteristics}
            characteristicChart={characteristicChart}
            productId={productId}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReviewModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewFormModal;
