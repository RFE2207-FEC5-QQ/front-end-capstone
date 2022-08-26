import React, { useState } from 'react';
import { Rating } from '@mui/material'

const Info = () => {

const [product, setProduct] = useState({
  id: 1,
  name: 'Cameo Onesie',
  rating: 3.5
})

  return (
    <div>
      <Rating
        name='rating'
        value={product.rating}
        precision={0.25}
        readOnly
      />
      {product.name}
    </div>
  )
}

export default Info;