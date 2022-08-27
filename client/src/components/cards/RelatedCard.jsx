import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  CardMedia,
  CardActions,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Typography,
} from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
// import {
//   StarBorderOutlinedIcon,
//   ImageNotSupportedIcon,
// } from '@mui/icons-material';

const RelatedCard = ({ item }) => {

  const [detail, setDetail] = useState(null);
  const [style, setStyle] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [origPrice, setOrigPrice] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {

    axios
      .get('/details', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const productDetail = results.data;
        // console.log('productDetail', productDetail);
        setDetail(productDetail);
      })
      .catch((err) => {
        throw ('Error fetching product detail');
      });

    axios
      .get('/styles', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const productStyle = results.data;
        // console.log('productStyle', productStyle);
        const defaultStyle = productStyle
          .results
          .find(eachStyle => eachStyle['default?'] === true);
        // console.log('defaultStyle', defaultStyle);
        if (defaultStyle) {
          setStyle(defaultStyle);
          if (defaultStyle.photos[0].thumbnail_url) {
            setImgURL(defaultStyle.photos[0].thumbnail_url);
          }
          setOrigPrice(defaultStyle.original_price);

          if (defaultStyle.sale_price) {
            set(defaultStyle.sale_price);
          }
        } else {
          // Need to determine with Daniel what to do if default style not set in API.
          // setStyle(productStyle.results[0]);
          // setImgURL(productStyle.resultsphotos[0].thumbnail_url);
        }
      })
      .catch((err) => {
        throw ('Error fetching product image');
      });

    axios
      .get('/reviews/meta', {
        params: {
          productId: item,
        }
      })
      .then((results) => {
        const productRatings = results.data.ratings;
        let numRatings = 0;
        let sumRatings = 0;
        let avgRating;

        for (let i in productRatings) {
          numRatings += parseInt(productRatings[i]);
          sumRatings += i * productRatings[i];
        }
        avgRating = sumRatings / numRatings;

        console.log('productRating', productRatings);
        console.log('avgRating', avgRating);
        setRating(avgRating);
      })
      .catch((err) => {
        throw ('Error getting product rating');
      });

  }, []);


  return (
    <React.Fragment>
      {detail &&
        <Card
          className='related-card'
          sx={{ width: 200, height: 300 }}
          elevation={0}>
          <CardActionArea>
            <StarBorderOutlinedIcon className='related-star'></StarBorderOutlinedIcon>
            {imgURL
              ? <CardMedia
                component="img"
                height="100%"
                image={imgURL}
                alt="green iguana"
                sx={{ height: 150, objectFit: 'contain' }}
              />
              : <ImageNotSupportedIcon className='no-image' sx={{ display: 'flex', height: 150}}/>
            }
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                {detail.category}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {detail.name}
              </Typography>
              {salePrice
                ? <React.Fragment>
                  <Typography variant="body2" color="red">
                    ${salePrice}
                  </Typography>
                  <Typography className='strike-original-price' variant="body2" color="text.secondary">
                    ${origPrice}
                  </Typography>
                </React.Fragment>
                : <Typography variant="body2" color="text.secondary">
                   ${origPrice}
                </Typography>
              }
              {/* Currently rating is not at correct precision. Fix later. */}
              <Rating
                name="quarter-rating"
                value={rating}
                precision={0.25}
                size='small'/>
            </CardContent>
          </CardActionArea>
        </Card>
      }
    </React.Fragment>
  );
};

export default RelatedCard;