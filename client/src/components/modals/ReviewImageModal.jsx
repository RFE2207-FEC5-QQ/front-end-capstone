import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

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
        <DialogActions sx={{margin: 'auto'}}>
          <Button onClick={closeImageModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewImageModal;
