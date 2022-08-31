import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
// import RelatedCard from './RelatedCard.jsx';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const RelatedProducts = () => {
  // Use placeholder productId passed down from global state for now.
  const [related, setRelated] = useState(null);

  useEffect(() => {
    axios
      .get('/related', {
        params: {
          // productId
          productId: 1,
        }
      })
      .then((results) => {
        setRelated(results);
      })
      .catch((err) => {
        throw ('Error fetching related products');
      });
  // }, [productId]);
  }, [1]);

  return (
    <Carousel>
      {/* <RelatedCard/>
      <RelatedCard/>
      <RelatedCard/>
      <RelatedCard/> */}
    </Carousel>
  );
};

export default RelatedProducts;
