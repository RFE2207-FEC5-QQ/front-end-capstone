import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Description = ({ product }) => {
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
            {product.features.map(feat => {
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
          <div className='product-social'>
            <a href='https://www.facebook.com'>
              <FacebookIcon
                sx={{
                  color: '#4267B2',
                  fontSize: 40,
                  margin: '5px'
                }}
              />
            </a>
            <a href='https://www.twitter.com'>
              <TwitterIcon
                sx={{
                  color: '#00acee',
                  fontSize: 40,
                  margin: '5px'
                }}
              />
            </a>
            <a href='https://www.pinterest.com'>
              <PinterestIcon
                sx={{
                  color: '#E60023',
                  fontSize: 40,
                  margin: '5px'
                }}
              />
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Description;