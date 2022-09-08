import React, { useState, useEffect } from 'react';
import Zoom from 'react-img-zoom';

import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CropFreeIcon from '@mui/icons-material/CropFree';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';

const Gallery = ({ product, selectedStyle, updateView, defaultView }) => {

  const [carousel, setCarousel] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState({});
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const clickForward = () => {
    if (index === 6 && carouselIndex !== carousel.length - 1) {
      setIndex(0);
      setCarouselIndex(carouselIndex + 1);
    } else {
      setIndex(index + 1);
    }
  }

  const clickBack = () => {
    if (index === 0 && carouselIndex !== 0) {
      setIndex(6);
      setCarouselIndex(carouselIndex - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const clickUp = () => {
    setCarouselIndex(carouselIndex - 1);
  }

  const clickDown = () => {
    setCarouselIndex(carouselIndex + 1);
    setIndex(0);
  }

  const carouselClick = (idx) => {
    setIndex(idx);
  }

  const cropClick = () => {
    updateView();
  }

  const zoomIn = () => {
    setZoom(true);
  }

  const zoomOut = () => {
    setZoom(false);
  }

  useEffect(() => {
    var photosArr = selectedStyle.photos;
    var result = [];
    var temp = [];
    photosArr.forEach(item => {
      if (temp.length === 7) {
        result.push(temp);
        temp = [item];
      } else {
        temp.push(item)
      }
    })
    if (temp.length) {
      result.push(temp);
    }
    setCarousel(result);
    setPhotos(result[0]);
    setPhoto(result[0][0]);
    setIndex(0);
    setCarouselIndex(0);
  }, [selectedStyle])

  useEffect(() => {
    if (carousel.length) {
      setPhoto(carousel[carouselIndex][index]);
    }
  }, [index])

  useEffect(() => {
    if (carousel.length) {
      setPhotos(carousel[carouselIndex])
      setPhoto(carousel[carouselIndex][index]);
    }
  }, [carouselIndex])

  if (defaultView) {
    return (
      <div className='overview-gallery'>
        <div className='gallery-carousel'>
          <KeyboardArrowUpIcon
            onClick={clickUp}
            className={carouselIndex === 0 ? 'no-arrow' : 'up-arrow'}
          />
          {photos.map((item, idx) => {
            if (item.thumbnail_url) {
              return (
                <img
                  key={idx}
                  className={idx === index ? 'selected-carousel-image carousel-image' : 'carousel-image'}
                  src={item.thumbnail_url}
                  onClick={() => {carouselClick(idx)}}
                ></img>
              )
            } else {
              return (
                <ImageNotSupportedIcon
                  className='selected-carousel-image'
                  sx={{
                    padding: '9px'
                  }}
                />
              )
            }
          })}
          <KeyboardArrowDownIcon
            onClick={clickDown}
            className={carouselIndex === carousel.length - 1 ? 'no-arrow' : 'up-arrow'}
          />
        </div>
        <div className='selected-image-container'>
          <ArrowBackIcon
            onClick={clickBack}
            className={(carouselIndex === 0 && index === 0) ? 'no-arrow' : 'left-arrow'}
          />
          {photo.url ? (
            <img
              className='selected-image'
              src={photo.url}
              onClick={cropClick}
              ></img>
          ) : (
            <ImageNotSupportedIcon
              className='selected-image-null'
            />
          )}
          <ArrowForwardIcon
            onClick={clickForward}
            className={(index === photos.length - 1 && carouselIndex === carousel.length - 1) ? 'no-arrow' : 'right-arrow'}
          />
          <CropFreeIcon
            className='crop-icon'
            onClick={cropClick}
          />
        </div>
      </div>
    )
  } else if (!defaultView && !zoom) {
    return (
      <div className='expanded-view'>
        <div className='gallery-carousel'>
          <KeyboardArrowUpIcon
            onClick={clickUp}
            className={carouselIndex === 0 ? 'no-arrow' : 'expanded-up-arrow'}
          />
          {photos.map((item, idx) => {
            return (
                <CropSquareRoundedIcon
                  key={idx}
                  className={idx === index ? 'selected-carousel-icon carousel-icon' : 'carousel-icon'}
                  onClick={() => {carouselClick(idx)}}
              />
            )
          })}
          <KeyboardArrowDownIcon
            onClick={clickDown}
            className={carouselIndex === carousel.length - 1 ? 'no-arrow' : 'expanded-up-arrow'}
          />
        </div>
        <div className='expanded-image-container'>
          <ArrowBackIcon
            onClick={clickBack}
            className={(carouselIndex === 0 && index === 0) ? 'no-arrow' : 'expanded-left-arrow'}
          />
          <img
            className='expanded-image'
            src={photo.url}
            onClick={zoomIn}
          ></img>
          <ArrowForwardIcon
            onClick={clickForward}
            className={(index === photos.length - 1 && carouselIndex === carousel.length - 1) ? 'no-arrow' : 'right-arrow'}
          />
          <CropFreeIcon
            className='crop-icon'
            onClick={cropClick}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className='expanded-view'>
        <div className='zoom-image-container' onClick={zoomOut}>
          <Zoom
            zoomScale={2.5}
            img={photo.url}
            height={600}
            width={1400}
          />
        </div>
      </div>
    )
  }
}

export default Gallery;