import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

const ReviewImageModal = ({id, url, closeImageModal}) => {

  return (
    <div className='review-image-modal'>
      <Dialog open={true} onClose={closeImageModal}>
        <DialogContent>
          <img
            src={url}
            style={{ width: '100%'}}
          />
        </DialogContent>
        <DialogActions>
          <button onClick={closeImageModal}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewImageModal;
