import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CloseIcon from '@mui/icons-material/Close';
import Comparison from './Comparison.jsx';

const RelatedCard = ({ psychMode, item, modal, onClick }) => {
  const [detail, setDetail] = useState(null);
  const [style, setStyle] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [percentOff, setPercentOff] = useState(null);
  const [origPrice, setOrigPrice] = useState(null);
  const [rating, setRating] = useState(null);

  let onPsych = '';

  if (psychMode) {
    onPsych = 'psychedelic-mode';
  } else {
    onPsych = '';
  }

  const currentStyle = (style) => {
    setStyle(style);
    console.log(style);
    if (style.photos.length) {
      setImgURL(style.photos[0].thumbnail_url);
      console.log(style.photos[0].thumbnail_url);
    }
    if (style.sale_price) {
      setSalePrice(style.sale_price);
      setPercentOff((origPrice - salePrice) / origPrice);
      // percentOff = discount;
    }
  };

  useEffect(() => {
    axios
      .get('/details', {
        params: {
          productId: item,
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
          productId: item,
        }
      })
      .then((results) => {
        const productStyle = results.data;
        console.log('productStyle', productStyle);
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
        throw ('Error fetching product image');
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
          setRating([0, 0]);
        }
        // console.log('productRating', productRatings);
        // console.log('avgRating', avgRating);
      })
      .catch((err) => {
        throw ('Error getting product rating');
      });

  }, []);

  const handleRemove = () => {
    onClick(item);
  };

  return (
    <React.Fragment>
      {(detail && style && rating) &&
        <div className='related-card'>
          {modal === 'outfit'
            ? <CloseIcon
              className='modal-button'
              onClick={handleRemove}
            />
            : <Comparison
              className='comparison'
              mainProduct={item}
              currProduct={{detail, salePrice, origPrice, rating}}
            />
          }
          {imgURL
            ? <div className='img-container'><img className='card-img' src={imgURL}></img></div>
            : <div className='img-container'><ImageNotSupportedIcon className='no-img'/></div>
          }
          <div className={`card-content ${onPsych}`}>
            <div className='card-description'>{detail.category}</div>
            <div className='card-description'>{detail.name}</div>
            {origPrice
              ? <React.Fragment>
                <div className='card-description'>
                  <span className='sale-price'>${origPrice}&nbsp;&nbsp;</span>
                  <span className='strike-original-price'>${origPrice}</span>
                </div>
              </React.Fragment>
              : <React.Fragment>
                <div className='card-description'>
                  <span className='original-price'>${origPrice}</span>
                </div>
              </React.Fragment>
            }
            {/* Currently rating is not at correct precision. Fix later. */}
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
      }
    </React.Fragment>
  );
};

export default RelatedCard;