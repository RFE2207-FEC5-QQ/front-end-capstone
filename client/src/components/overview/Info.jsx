import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Rating } from '@mui/material';

import { paletteMap } from '../../App.jsx';

const Info = ({ product, selectedStyle }) => {

  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState(0);

  const getAvgRating = (ratings) => {
    var total = 0;
    var count = 0;
    for (var rating in ratings) {
      total += (rating * Number(ratings[rating]));
      count += Number(ratings[rating]);
    }
    var average = Math.ceil((total / count) * 100) / 100;
    setReviews(count);
    setRating(average);
  };

  const getRatings = (id) => {
    var options = {
      method: 'get',
      url: '/reviews/meta',
      params: {
        productId: product.id
      }
    };
    axios(options)
      .then(result => {
        getAvgRating(result.data.ratings);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRatings();
  }, [product]);

  if (selectedStyle.sale_price) {
    return (
      <div className='product-info'>
        <div className='product-rating'>
          <Rating
            sx={{
              color: paletteMap[Math.round(rating)]
            }}
            name='rating'
            value={rating}
            precision={0.25}
            readOnly
          />
          <a href='#reviews' className='read-all-reviews'>
            {`Read All [${reviews}] Reviews`}
          </a>
        </div>
        <div className='product-category'>
          {product.category}
        </div>
        <div className='overview-product-name'>
          {product.name}
        </div>
        <div className='product-price'>
          <div className='org-price'>
            {`$${selectedStyle.original_price}`}
          </div>
          <div className='sale-price'>
            {`$${selectedStyle.sale_price}`}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='product-info'>
        <div className='product-rating'>
          <Rating
            sx={{
              color: paletteMap[Math.round(rating)]
            }}
            name='rating'
            value={rating}
            precision={0.25}
            readOnly
          />
          <a href='#reviews' className='read-all-reviews'>
            {`Read All [${reviews}] Reviews`}
          </a>
        </div>
        <div className='product-category'>
          {product.category}
        </div>
        <div className='overview-product-name'>
          {product.name}
        </div>
        <div className='product-price' id='product-price'>
          {`$${selectedStyle.original_price}`}
        </div>
      </div>
    );
  }
};

export default Info;