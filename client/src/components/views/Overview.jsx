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
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});

  const getProducts = () => {
    var options = {
      method: 'get',
      url: '/details',
    }
    axios(options)
      .then(res => {
        setProducts(res.data);
        // move this product up to index.jsx
        setProduct(res.data[0]);
      })
  }

  const getStyles = (id=37311) => {
    var options = {
      method: 'get',
      url: '/styles',
      params: {
        id: id
      }
    }
    axios(options)
      .then(res => {
        setStyles(res.data.results);
        setSelectedStyle(res.data.results[0]);
      })
  }

  const updateStyle = (style) => {
    setSelectedStyle(style);
  }

  useEffect(() => {
    getProducts();
    getStyles();
  }, [])

  if (products.length) {
    return (
      <div className='view-overview'>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Gallery />
          </Grid>
          <Grid item xs={4}>
            <Info
              product={product}
            />
            <Style
              styles={styles}
              selectedStyle={selectedStyle}
              updateStyle={updateStyle}
            />
            <Cart
              skus={selectedStyle.skus}
            />
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
