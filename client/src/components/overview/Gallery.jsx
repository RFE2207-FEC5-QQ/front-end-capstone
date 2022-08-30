import React, { useState, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CropFreeIcon from '@mui/icons-material/CropFree';

const Gallery = ({ product, selectedStyle }) => {

  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({});
  const [index, setIndex] = useState(0);

  const clickForward = () => {
    setIndex(index + 1);
  }

  const clickBack = () => {
    setIndex(index - 1);
  }

  const carouselClick = (idx) => {
    setIndex(idx);
  }

  const cropClick = () => {
    console.log('crop clicked')
  }

  useEffect(() => {
    setPhotos(selectedStyle.photos);
    setPhoto(selectedStyle.photos[index]);
  }, [selectedStyle])

  useEffect(() => {
    setPhoto(selectedStyle.photos[index]);
  }, [index])

  return (
    <div className='overview-gallery'>
      <div className='gallery-carousel'>
        {photos.map((item, idx) => {
          return (
            <img
              key={idx}
              className={idx === index ? 'selected-carousel-image carousel-image' : 'carousel-image'}
              src={item.thumbnail_url}
              onClick={() => {carouselClick(idx)}}
            ></img>
          )
        })}
      </div>
      <div className='selected-image-container'>
        <ArrowBackIcon
          onClick={clickBack}
          className={index === 0 ? 'no-arrow' : 'left-arrow'}
        />
        <img
          className='selected-image'
          src={photo.thumbnail_url}
          ></img>
        <ArrowForwardIcon
          onClick={clickForward}
          className={index === photos.length - 1 ? 'no-arrow' : 'right-arrow'}
        />
        <CropFreeIcon
          className='crop-icon'
          onClick={cropClick}
        />
      </div>
    </div>
  )
}

export default Gallery;