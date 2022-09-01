import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Alert } from '@mui/material'

const Cart = ({ selectedStyle, skus }) => {

  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState('');
  const [qtys, setQtys] = useState([]);
  const [qty, setQty] = useState('');
  const [sizeNotSelected, setSizeNotSelected] = useState('');
  const [cart, setCart] = useState(false);

  const getSizes = () => {
    var sizeArr = [];
    for (var item in skus) {
      if (skus[item].size) {
        sizeArr.push(skus[item].size);
      }
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
    for (var i = 1; i <= quantity; i++) {
      if (i <= 15) {
        qtysArr.push(i);
      }
    }
    setQtys(qtysArr);
    setQty(1);
  }

  const updateQty = (e) => {
    setQty(e.target.value);
  }

  const addToCart = () => {
    if (size === '') {
      setSizeNotSelected(true);
      setCart(true);
    } else {
      setSizeNotSelected(false);
      console.log('add to cart button clicked: ', selectedStyle, size, qty);
    }
  }

  useEffect(() => {
    getSizes();
    setSize('');
    setQty('');
    setSizeNotSelected('');
  }, [skus])

  useEffect(() => {
    if (size !== '') {
      setSizeNotSelected(false);
    }
  }, [size])

  if (sizes.length) {
    return(
      <div className='overview-cart'>
        <div className='overview-select'>
          {sizeNotSelected &&
          <div className='size-warning'>
            <Alert
              severity="error"
              sx={{width: '200px'}}
            >Please Select Size
            </Alert>
          </div>
          }
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
              disabled={size === ''}
            >
              {qtys.map(qty => {
                return <MenuItem value={qty} key={qty}>{qty}</MenuItem>
              })}
            </Select>
          </FormControl>
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
  } else {
    return(
      <div className='overview-cart'>
        <div className='overview-select'>
          <FormControl className='overview-select'>
            <InputLabel>
              OUT OF STOCK
            </InputLabel>
            <Select
              value={size}
              label="Select"
              disabled
              >
            </Select>
          </FormControl>
        </div>
      </div>
    )
  }
}

export default Cart;