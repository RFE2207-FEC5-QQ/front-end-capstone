import React, { useState } from 'react';
import { Box, Grid, ToggleButton } from '@mui/material'

const Style = ({ styles, updateStyle }) => {

  const [checked, setChecked] = useState(styles[0]);

  const styleClick = (style) => {
    setChecked(style);
    updateStyle(style);
  }

  // Have to implement checkmark
  // Have to use CSS to correctly size each image

  return(
    <div className='overview-styles'>
      STYLE > SELECTED STYLE
      <Grid container spacing={1}>
        {styles.map(style => {
          return (
            <div className='style-images'>
              <Grid item xs={3}>
                <img
                  className='style-image'
                  src={style.photos[0].thumbnail_url}
                  key={style.style_id}
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