import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material'

import Info from '../overview/Info.jsx';
import Style from '../overview/Style.jsx';
import Cart from '../overview/Cart.jsx';
import Description from '../overview/Description.jsx';
import Gallery from '../overview/Gallery.jsx';
// React module is imported if you choose to convert to class component, remove the import if not

const Overview = (props) => {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [defaultView, setDefaultView] = useState(true);

  const getProducts = () => {
    var options = {
      method: 'get',
      url: '/details',
    }
    axios(options)
      .then(res => {
        setProducts(res.data);
        setProduct(res.data[0]);
        getStyles(res.data[0].id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getStyles = (id) => {
    var options = {
      method: 'get',
      url: '/styles',
      params: {
        id: id
      }
    }
    axios(options)
      .then(res => {
        var results = res.data.results;
        var hasDefault = false;
        setStyles(results);
        results.forEach(result => {
          if (result['default?']) {
            hasDefault = true;
            setSelectedStyle(result)
          }
        })
        if (!hasDefault) {
          setSelectedStyle(results[0]);
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateStyle = (style) => {
    setSelectedStyle(style);
  }

  const updateView = () => {
    setDefaultView(!defaultView);
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (defaultView) {
    if (products.length && Object.keys(selectedStyle).length) {
      return (
        <div className='view-overview'>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Gallery
                product={product}
                selectedStyle={selectedStyle}
                updateView={updateView}
                defaultView={defaultView}
              />
            </Grid>
            <Grid item xs={4}>
              <Info
                product={product}
                selectedStyle={selectedStyle}
              />
              <Style
                styles={styles}
                selectedStyle={selectedStyle}
                updateStyle={updateStyle}
              />
              <Cart
                selectedStyle={selectedStyle}
                skus={selectedStyle.skus}
              />
            </Grid>
            <Grid item xs={12} id='description-grid'>
              <Description
                product={product}
              />
            </Grid>
          </Grid>
        </div>
      );
    }
  } else {
    return (
      <div className='view-overview'>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Gallery
              product={product}
              selectedStyle={selectedStyle}
              updateView={updateView}
              defaultView={defaultView}
            />
          </Grid>
          <Grid item xs={12} id='description-grid'>
            <Description
              product={product}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Overview;
