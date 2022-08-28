import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Rating } from '@mui/material'

const Info = ({ product, selectedStyle }) => {

  const [rating, setRating] = useState(0)

  const getAvgRating = (ratings) => {
    var total = 0;
    var count = 0;
    for (var rating in ratings) {
      total += (rating * Number(ratings[rating]));
      count += Number(ratings[rating]);
    }
    var average = Math.ceil((total / count) * 100) / 100;
    setRating(average);
  }

  const getRatings = (id) => {
    var options = {
      method: 'get',
      url: '/reviews/meta',
      params: {
        productId: product.id
      }
    }
    axios(options)
      .then(result => {
        getAvgRating(result.data.ratings);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getRatings();
  })
  if (selectedStyle.sale_price) {
    return (
      <div className='product-info'>
        <div className='product-rating'>
          <Rating
            name='rating'
            value={rating}
            precision={0.25}
            readOnly
          />
          <a>
            {`Read All [] Reviews`}
          </a>
        </div>
        <div className='product-category'>
          {product.category}
        </div>
        <div className='product-name'>
          {product.name}
        </div>
        <div className='product-price'>
          <div className='original-price'>
            {`$${selectedStyle.original_price}`}
          </div>
          <div className='sale-price'>
            {`$${selectedStyle.sale_price}`}
          </div>
        </div>
        <div className='product-social-media'>
          Facebook
          Twitter
          Pinterest
        </div>
      </div>
    )
  } else {
    return (
      <div className='product-info'>
        <div className='product-rating'>
          <Rating
            name='rating'
            value={rating}
            precision={0.25}
            readOnly
          />
          <a>
            {`Read All [] Reviews`}
          </a>
        </div>
        <div className='product-category'>
          {product.category}
        </div>
        <div className='product-name'>
          {product.name}
        </div>
        <div className='product-price'>
          {`$${selectedStyle.original_price}`}
        </div>
        <div className='product-social-media'>
          Facebook
          Twitter
          Pinterest
        </div>
      </div>
    )
  }
}

export default Info;