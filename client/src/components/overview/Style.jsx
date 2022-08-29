import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import CheckIcon from '@mui/icons-material/Check';

const Style = ({ styles, updateStyle, selectedStyle }) => {

  const [checked, setChecked] = useState('');

  const styleClick = (style) => {
    setChecked(style);
    updateStyle(style);
  }

  useEffect(() => {
    setChecked(selectedStyle);
  }, [selectedStyle])

  // Have to implement checkmark
  // Make header look nicer
    return(
      <div className='overview-styles'>
        <span className='style-selector'>
          STYLE >
        </span>
        <span className='selected-style'>
          {selectedStyle.name}
        </span>
        <Grid container spacing={1}>
          {styles.map(style => {
            if (style.photos[0].thumbnail_url) {
              return (
                <div className='style-images' key={style.style_id}>
                  <Grid item xs={3}>
                    <CheckIcon
                      className={checked.style_id === style.style_id ? 'checked-image' : 'unchecked-image'}
                    />
                    <img
                      className='style-image'
                      src={style.photos[0].thumbnail_url}
                      onClick={() => {styleClick(style)}}
                    ></img>
                  </Grid>
                </div>
              )
            } else {
              return (
                <div className='style-images' key={style.style_id}>
                  <Grid item xs={3}>
                    <ImageNotSupportedIcon
                      className={checked.style_id === style.style_id ? 'style-image checked-image' : 'style-image'}
                      onClick={() => {styleClick(style)}}
                      sx={{
                        width: '68px',
                        height: '68px'
                      }}
                    />
                  </Grid>
              </div>
              )
            }
          })}
        </Grid>
      </div>
    )
}

export default Style;