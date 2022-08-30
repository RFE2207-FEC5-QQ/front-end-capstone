import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

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
          <Grid item xs={8} className='slogan-description'>
            <div className='product-slogan'>
              {product.slogan}
            </div>
            <div className='product-description'>
              {product.description}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='product-features'>
              {info.features.map(feat => {
                return (
                  <div key={feat.feature}>
                    <span>
                      <TaskAltRoundedIcon />
                    </span>
                    <span className='feature-value'>{feat.feature} - {feat.value}</span>
                  </div>
                )
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Description;