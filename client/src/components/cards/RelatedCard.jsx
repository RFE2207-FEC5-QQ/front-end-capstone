import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CardMedia,
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const RelatedCard = ({ item }) => {

  const [detail, setDetail] = useState(null);
  const [style, setStyle] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [origPrice, setOrigPrice] = useState(null);
  const [rating, setRating] = useState(null);

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
        // console.log('productStyle', productStyle);
        const defaultStyle = productStyle
          .results
          .find(eachStyle => eachStyle['default?'] === true);
        // console.log('defaultStyle', defaultStyle);
        if (defaultStyle) {
          setStyle(defaultStyle);
          if (defaultStyle.photos[0].thumbnail_url) {
            setImgURL(defaultStyle.photos[0].thumbnail_url);
          }
          if (defaultStyle.sale_price) {
            set(defaultStyle.sale_price);
          }
        } else {
          // Need to determine with Daniel what to do if default style not set in API.
          // setStyle(productStyle.results[0]);
          // setImgURL(productStyle.resultsphotos[0].thumbnail_url);
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
        avgRating = sumRatings / numRatings;
        // console.log('productRating', productRatings);
        console.log('avgRating', avgRating);
        setRating(avgRating);
      })
      .catch((err) => {
        throw ('Error getting product rating');
      });

  }, []);


  return (
    <React.Fragment>
      {detail &&
        <div className='related-card'>
          <ArrowDropDownOutlinedIcon className='related-star'></ArrowDropDownOutlinedIcon>
          {imgURL
            ? <img className='card-img' src={imgURL}></img>
            : <div className='no-img'><ImageNotSupportedIcon sx={{border: 'solid 1px red'}}/></div>
          }
          <div className='card-content'>
            <div className='card-description'>{detail.category}</div>
            <div className='card-description'>{detail.name}</div>
            {origPrice
              ? <React.Fragment>
                <div className='card-description sale-price'>${origPrice}</div>
                <div className='card-description strike-original-price'>${origPrice}</div>
              </React.Fragment>
              : <div className='card-description'>${origPrice}</div>
            }
            {/* Currently rating is not at correct precision. Fix later. */}
            <Rating
              className='card-description'
              name="quarter-rating"
              value={rating}
              precision={0.25}
              size='small'/>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default RelatedCard;