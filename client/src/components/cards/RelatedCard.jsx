import React, { useState, useEffect } from 'react';
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

const RelatedCard = ({ item }) => {

  const [imageURL, setimageURL] = useState('');

  useEffect(() => {
    axios
      .get('/styles', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const url = results.data;
        setImage(url);
      })
      .catch((err) => {
        throw ('Error fetching product image');
      });

  }, []);


  return (
    <Card
      className='related-card'
      sx={{ maxWidth: 250 }}
      elevation={0}>
      <StarBorderOutlinedIcon className='related-star'></StarBorderOutlinedIcon>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={imageURL}
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
  );
};

export default RelatedCard;