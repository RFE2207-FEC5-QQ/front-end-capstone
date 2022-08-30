import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

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
