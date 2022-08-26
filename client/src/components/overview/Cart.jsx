import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const Cart = (props) => {

  const [sizes, setSizes] = useState(['xs', 's']);
  const [size, setSize] = useState('s');

  return(
    <div className='overview-cart'>
      <Box>
        <FormControl fullWidth>
          <InputLabel>
            Select Size
          </InputLabel>
          <Select
            label="Select"
          >
            {sizes.map(size => {
              return <MenuItem>{size}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
      <FormControl fullWidth>
        <InputLabel>
          Qty
        </InputLabel>
        <Select
          label="Select"
        >
          <MenuItem>Qty 1</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Cart;