import React from 'react';
import {
  Box,
  CardMedia,
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const RelatedCard = (props) => {

  return (
    // <Box>
    <Card
      className='related-card'
      sx={{ maxWidth: 250 }}
      elevation={0}>
      <StarBorderOutlinedIcon className='related-star'></StarBorderOutlinedIcon>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image="https://unsplash.com/photos/e616t35Vbeg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    // </Box>
  );
};

export default RelatedCard;