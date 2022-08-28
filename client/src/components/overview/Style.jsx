import React, { useState, useEffect } from 'react';
import { Box, Grid, ToggleButton } from '@mui/material'

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
            return (
              <div className='style-images' key={style.style_id}>
                <Grid item xs={3}>
                  <img
                    className={checked.style_id === style.style_id ? 'style-image checked-image' : 'style-image'}
                    src={style.photos[0].thumbnail_url}
                    onClick={() => {styleClick(style)}}
                  ></img>
                </Grid>
              </div>
            )
          })}
        </Grid>
      </div>
    )
}

export default Style;