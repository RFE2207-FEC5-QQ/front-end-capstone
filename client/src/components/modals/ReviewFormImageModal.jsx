import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

import ReviewImage from '../cards/ReviewImage.jsx';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
const ReviewFormImageModal = ({photos, submitPhoto, closeModal}) => {

  const [photoUrl, setPhotoUrl] = useState('');
  const photoLimit = 5;

  const addPhoto = (e) => {
    e.preventDefault();
    submitPhoto(photoUrl);
    setPhotoUrl('');
  };

  let addValid = false;
  let photoLimitReached = photos.length >= photoLimit;

  if (photoUrl.length > 0) {
    addValid = true;
  }

  return (
    <div className='review-form-image-modal'>
      <Dialog open={true} onClose={closeModal}>
        <DialogContent>
          <div className='review-form-image-modal-entry'>
            {photoLimitReached ? <p>Photo limit reached</p> :
              <label>
                {'Photo URL'}
                <input
                  type='text'
                  name={'photourl'}
                  placeholder='Enter photo URL'
                  value={photoUrl}
                  onChange={(e) => {
                    e.preventDefault();
                    setPhotoUrl(e.target.value);
                  }}
                />
              </label>
            }
          </div>
          <button
            onClick={addPhoto}
            disabled={!addValid && photoLimitReached}
          >Add</button>
          {` ${photos.length}/${photoLimit} Added`}
          {photos.length > 0 &&
            <div className='review-images'>
              {photos.map((photo, index) => {
                return (
                  <ReviewImage id={photo} url={photo} key={index}/>
                );
              })}
            </div>
          }
        </DialogContent>
        <DialogActions>
          <button onClick={closeModal}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewFormImageModal;
