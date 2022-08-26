import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material'

import Info from '../overview/Info.jsx';
import Style from '../overview/Style.jsx';
import Cart from '../overview/Cart.jsx';
import Description from '../overview/Description.jsx';
import Gallery from '../overview/Gallery.jsx';
// React module is imported if you choose to convert to class component, remove the import if not

const Overview = () => {

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    var options = {
      method: 'get',
      url: '/details',
    }
    axios(options)
      .then(res => {
        setProducts(res.data);
      })
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (products.length) {
    return (
      <div className='view-overview'>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Gallery />
          </Grid>
          <Grid item xs={4}>
            <Info product={products[0]}/>
            <Style />
            <Cart />
          </Grid>
          <Grid item xs={12}>
            <Description />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Overview;
