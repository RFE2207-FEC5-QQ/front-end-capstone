import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedCard from '../cards/RelatedCard.jsx';
// import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Box } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const RelatedProducts = () => {
  // Use placeholder productId passed down from global state for now.
  // const [related, setRelated] = useState(null);
  const [related, setRelated] = useState([
    37312,
    37313,
    37318,
    37317
  ]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // useEffect(() => {
  //   axios
  //     .get('/related', {
  //       params: {
  //         // productId
  //         productId: 37311,
  //       }
  //     })
  //     .then((results) => {
  //       setRelated(results);
  //     })
  //     .catch((err) => {
  //       throw ('Error fetching related products');
  //     });
  // // }, [productId]);
  // }, [1]);

  let relatedMap = related.map((product, i) => <RelatedCard key={i} item={product}/>);

  return (
    <Carousel className='carousel' responsive={responsive}>
      {relatedMap}
    </Carousel>
  );
};

export default RelatedProducts;
