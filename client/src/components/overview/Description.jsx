import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material'

const Description = ({ product }) => {

  const [info, setInfo] = useState({});

  const getProductInfo = (id) => {
    var options = {
      method: 'get',
      url: '/info',
      params: {
        id: id
      }
    }
    axios(options)
      .then(res => {
        setInfo(res.data)
      })
  }

  useEffect(() => {
    getProductInfo(product.id)
  }, [])

  if (Object.keys(info).length) {
    return(
      <div className='overview-description'>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className='product-slogan'>
              {product.slogan}
            </div>
            <div className='product-description'>
              {product.description}
            </div>
          </Grid>
          <Grid item xs={4}>
            <ul className='product-features'>
              {info.features.map(feat => {
                return (
                  <li key={feat.feature}>
                    <div>{feat.feature} - {feat.value}</div>
                  </li>
                )
              })}
            </ul>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Description;