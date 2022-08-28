import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'

const Cart = ({ skus }) => {

  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('');
  const [qtys, setQtys] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const [qty, setQty] = useState('');

  const getSizes = () => {
    var sizeArr = [];
    for (var item in skus) {
      sizeArr.push(skus[item].size);
    }
    setSizes(sizeArr);
  }

  const updateSize = (e) => {
    setSize(e.target.value);
    var qtysArr = [];
    var quantity = 0;
    for (var key in skus) {
      if (skus[key].size === e.target.value) {
        quantity = skus[key].quantity;
      }
    }
    if (quantity > 15) {
      return;
    }
    for (var i = 1; i <= quantity; i++) {
      qtysArr.push(i);
    }
    setQtys(qtysArr);
  }

  const updateQty = (e) => {
    setQty(e.target.value);
  }

  const addToCart = () => {
    console.log('add to cart button clicked');
  }

  useEffect(() => {
    getSizes();
  }, [])

  return(
    <div className='overview-cart'>
      <div className='overview-select'>
        <FormControl className='overview-select'>
          <InputLabel>
            Select Size
          </InputLabel>
          <Select
            value={size}
            label="Select"
            onChange={updateSize}
            >
            {sizes.map(size => {
              return <MenuItem value={size} key={size}>{size}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      <div className='overview-select'>
        <FormControl className='overview-select'>
          <InputLabel>
            -
          </InputLabel>
          <Select
            value={qty}
            label="Select"
            onChange={updateQty}
          >
            {qtys.map(qty => {
              return <MenuItem value={qty} key={qty}>{qty}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      <div className='overview-select'>
      </div>
      <div className='add-to-cart'>
        <Button
          variant='contained'
          className='add-to-cart'
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default Cart;