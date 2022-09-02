import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

import ReviewFormImageModalURL from '../forms/ReviewFormImageModalURL.jsx';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
const ReviewFormImageModal = ({submitPhotos, closeModal}) => {

  const [photos, setPhotos] = useState(['']);
  const [photoCount, setPhotoCount] = useState(1);

  const addPhoto = (e) => {
    e.preventDefault();
    let newPhotos = photos.slice();
    newPhotos.push('');
    setPhotos(newPhotos);
    setPhotoCount(photoCount + 1);
  };

  const onSave = (e) => {
    e.preventDefault();
    submitPhotos(photos);
  };

  let urlFields = [];
  for (let i = 0; i < photoCount; i++) {
    urlFields.push(<ReviewFormImageModalURL index={i} photos={photos} setPhotos={setPhotos}/>);
  }

  return (
    <div className='review-form-image-modal'>
      <Dialog open={true} onClose={closeModal}>
        <DialogContent>
          {urlFields}
          <button onClick={addPhoto}>Add</button>
          <button onClick={onSave}>Save</button>
        </DialogContent>
        <DialogActions>
          <button onClick={closeModal}>Close</button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default ReviewFormImageModal;
