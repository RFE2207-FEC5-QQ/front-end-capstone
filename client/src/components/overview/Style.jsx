import React, { useState } from 'react';
import { Box, Grid, ToggleButton } from '@mui/material'

const Style = ({styles}) => {

  const [checked, setChecked] = useState(styles[0].style_id);

  const updateStyle = (id) => {
    console.log('style id clicked:', id)
    setChecked(id);
  }

  return(
    <div className='overview-styles'>
      Styles:
      <Grid container spacing={1}>
        {styles.map(style => {
          return (
            <Box>
              <Grid item xs={3}>
                <ToggleButton onClick={() => {updateStyle(style.style_id)}}>
                  <img src={style.photos[0].thumbnail_url}></img>
                </ToggleButton>
              </Grid>
            </Box>
          )
        })}
      </Grid>
    </div>
  )
}

export default Style;