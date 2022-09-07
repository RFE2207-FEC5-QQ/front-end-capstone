import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import Comparison from './Comparison.jsx';
// import reactImageSize from 'react-image-size';

const RelatedCard = ({ item, mainProduct, modal, onClick }) => {
  const [detail, setDetail] = useState(null);
  const [style, setStyle] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [percentOff, setPercentOff] = useState(null);
  const [origPrice, setOrigPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [orderedImgs, setOrderedImgs] = useState(null);
  let imgDimensions = [];

  // For customizing image display by aspect ratio.
  // const currentStyle = (style) => {
  //   setStyle(style);
  //   // console.log('style', style, 'item,', item);
  //   if (style.photos[0].thumbnail_url) {
  //     for (let i = 0; i < style.photos.length; i++) {
  //       reactImageSize(style.photos[i].thumbnail_url)
  //         .then(({width, height}) => {
  //           // console.log('imgDimensions real:', imgDimensions);
  //           imgDimensions.push([style.photos[i].thumbnail_url, height / width]);
  //           if (i === style.photos.length - 1) {
  //             const optimizedImgs = imgDimensions.sort((a, b) => Math.abs(a[1] - 1) - Math.abs(b[1] - 1) + 0.16);
  //             setOrderedImgs(optimizedImgs);
  //             setImgURL(optimizedImgs[0][0]);
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //     console.log('style photos0', style.photos[0].thumbnail_url);
  //   } else {
  //     setImgURL(false);
  //   }
  //   if (style.sale_price) {
  //     setSalePrice(style.sale_price);
  //     setPercentOff((origPrice - salePrice) / origPrice);
  //   }
  // };

  // For regular image display. No algorithm applied to sort by dimensions.
  const currentStyle = (style) => {
    setStyle(style);
    // console.log('style', style, 'item,', item);
    if (style.photos[0].thumbnail_url) {
      setImgURL(style.photos[0].thumbnail_url);
    } else {
      setImgURL(false);
    }
    if (style.sale_price) {
      setSalePrice(style.sale_price);
      setPercentOff((origPrice - salePrice) / origPrice);
    }
  };

  let handleProductChange = () => {
    onClick(item);
  };

  useEffect(() => {
    axios
      .get('/info', {
        params: {
          id: item,
        }
      })
      .then((results) => {
        const productDetail = results.data;
        // console.log('productDetail', productDetail);
        setDetail(productDetail);
        setOrigPrice(productDetail.default_price);
      })
      .catch((err) => {
        throw ('Error fetching product detail');
      });

    axios
      .get('/styles', {
        params: {
          id: item,
        }
      })
      .then((results) => {
        const productStyle = results.data;
        // console.log('productStyle', productStyle);
        const defaultStyle = productStyle
          .results
          .find(eachStyle => eachStyle['default?'] === true);
        // console.log('defaultStyle', defaultStyle);
        if (defaultStyle) {
          currentStyle(defaultStyle);
        } else {
          currentStyle(productStyle.results[0]);
        }
      })
      .catch((err) => {
        throw ('Error fetching product style');
      });

    axios
      .get('/reviews/meta', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const productRatings = results.data.ratings;
        let numRatings = 0;
        let sumRatings = 0;
        let avgRating;

        for (let i in productRatings) {
          numRatings += parseInt(productRatings[i]);
          sumRatings += i * productRatings[i];
        }
        if (numRatings) {
          avgRating = sumRatings / numRatings;
          setRating([avgRating, numRatings]);
        } else {
          setRating([0, 'No ratings yet']);
        }
        // console.log('productRating', productRatings);
        // console.log('avgRating', avgRating);
      })
      .catch((err) => {
        throw ('Error getting product rating');
      });

  }, [item]);

  const handleRemove = () => {
    onClick(item);
  };

  if (modal === 'outfit') {
    handleProductChange = null;
  }

  return (
    <React.Fragment>
      {(detail && style && (rating !== null) && (imgURL !== null))
        ? <div className='related-card' onClick={handleProductChange}>
          {modal === 'outfit'
            ? <CloseIcon
              className='modal-button'
              aria-label='close-outfit-card'
              onClick={handleRemove}
            />
            : <Comparison
              className='comparison'
              aria-label='comparison-modal'
              mainProduct={mainProduct}
              currProduct={detail}
            />
          }
          {imgURL
            ? <div className='img-container'><img className='card-img' alt={detail.name} src={imgURL}></img></div>
            : <div className='img-container'><ImageNotSupportedIcon className='no-img'/></div>
          }
          <div className='card-content'>
            <div className='card-description'>{detail.category}</div>
            <div className='card-description'>{detail.name}</div>
            {salePrice
              ? <React.Fragment>
                <div className='card-description'>
                  <span className='sale-price'>${salePrice}&nbsp;&nbsp;</span>
                  <span className='strike-original-price'>${origPrice}</span>
                </div>
              </React.Fragment>
              : <React.Fragment>
                <div className='card-description'>
                  <span className='original-price'>${origPrice}</span>
                </div>
              </React.Fragment>
            }
            <div className='card-rating'>
              <Rating
                className='card-rating'
                name="quarter-rating"
                value={rating[0]}
                precision={0.25}
                size='small'
                readOnly/>
              <div className='num-ratings'>&nbsp;&nbsp;&#40;{rating[1]}&#41;</div>
            </div>
          </div>
        </div>
        : <div aria-label='progress-icon' className='progress-icon'>
          <CircularProgress sx={{ color: 'black' }}/>
        </div>
      }
    </React.Fragment>
  );
};

export default RelatedCard;