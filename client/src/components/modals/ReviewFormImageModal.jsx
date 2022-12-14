import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

import ReviewImageList from '../lists/ReviewImageList.jsx';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
const ReviewFormImageModal = ({photos, submitPhoto, closeModal, errorResponse}) => {

  const [photoUrl, setPhotoUrl] = useState('');
  const photoLimit = 5;
  const photoLimitReached = photos.length >= photoLimit;

  const addPhoto = (e) => {
    e.preventDefault();
    submitPhoto(photoUrl);
    setPhotoUrl('');
  };

  return (
    <div className='review-form-image-modal'>
      <Dialog open={true} onClose={closeModal}>
        <DialogContent>
          <div className='review-form-image-modal-entry'>
            {photoLimitReached ? <p>Photo limit reached</p> :
              <input
                type='text'
                name='photourl'
                placeholder='Enter photo URL'
                value={photoUrl}
                onChange={(e) => {
                  e.preventDefault();
                  setPhotoUrl(e.target.value);
                }}
              />
            }
            <Button
              onClick={addPhoto}
              disabled={photoUrl.length === 0 || photoLimitReached}
            >Add</Button>
            {`${photos.length}/${photoLimit} Added`}
          </div>
          <ReviewImageList
            photoUrls={photos}
            errorResponse={errorResponse}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewFormImageModal;
