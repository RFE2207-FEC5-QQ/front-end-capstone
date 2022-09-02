import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

const ReviewFormImageModalURL = ({index, photos, setPhotos}) => {

  const [photoURL, setPhotoURL] = useState('');

  return (
    <div className='review-form-image-modal-entry'>
      <label>
        {'Photo URL'}
        <input
          type='text'
          name={`photourl-${index}`}
          placeholder='Enter photo URL'
          value={photoURL}
          onChange={(e) => {
            e.preventDefault();
            setPhotoURL(e.target.value);
            let newPhotos = photos.slice();
            newPhotos[index] = e.target.value;
            setPhotos(newPhotos);
          }}
        />
      </label>
    </div>
  );

};

export default ReviewFormImageModalURL;
