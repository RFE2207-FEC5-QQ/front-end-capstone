import React, { useState, useEffect } from 'react';
import { Box, Rating } from '@mui/material'

const Info = ({product}) => {

  return (
    <div className='product-info'>
      <div className='product-rating'>
        <Rating
          name='rating'
          value={2.5}
          precision={0.25}
          readOnly
        />
        Read All Reviews
      </div>
      <Box>
        {product.category}
      </Box>
      <div className='product-name'>
        {product.name}
      </div>
      <div className='product-price'>
        {`$${product.default_price}`}
      </div>
      <div className='product-social-media'>
        Facebook
        Twitter
        Pinterest
      </div>
    </div>
  )
}

export default Info;