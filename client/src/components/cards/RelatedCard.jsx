import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  // const [imageURL, setimageURL] = useState('');
  const [style, setStyle] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    axios
      .get('/styles', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const productStyle = results.data;
        // console.log('productStyle', productStyle.results[0].photos[0].url);
        console.log('productStyle', productStyle);
        setStyle(productStyle);
        setImgURL(productStyle.results[0].photos[0].thumbnail_url);
      })
      .catch((err) => {
        throw ('Error fetching product image');
      });

  }, []);


  return (
    <React.Fragment>
      {style &&
        <Card
          className='related-card'
          sx={{ maxWidth: 250 }}
          elevation={0}>
          <StarBorderOutlinedIcon className='related-star'></StarBorderOutlinedIcon>
          <CardActionArea>
            {imgURL
              ? <CardMedia
                component="img"
                height="100%"
                image={imgURL}
                alt="green iguana"
              />
              : <div className='related-image'>No image</div>
            }
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
      }
    </React.Fragment>
  );
};

export default RelatedCard;