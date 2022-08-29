import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import RelatedCard from '../cards/RelatedCard.jsx';
import { Paper, Button, Box } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  // superLargeDesktop: {
  //   // the naming can be any, depends on you.
  //   breakpoint: { max: 4000, min: 3000 },
  //   items: 5
  // },
  desktop: {
    breakpoint: { max: 3000, min: 464 },
    items: 3
  },
  // tablet: {
  //   breakpoint: { max: 1024, min: 464 },
  //   items: 3
  // },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const RelatedProducts = () => {
  const [relatedList, setRelatedList] = useState(null);

  useEffect(() => {
    axios
      .get('/related', {
        params: {
          // Placeholder productId for now.
          productId: 37311,
        }
      })
      .then((results) => {
        const relatedIds = [...new Set(results.data)];
        console.log('relatedIds', relatedIds);
        setRelatedList(relatedIds);
      })
      .catch((err) => {
        throw ('Error fetching related products');
      });
  }, []);

  return (
    <React.Fragment>
      <h4 className='related-header'>Related Products</h4>
      {relatedList &&
        <Carousel className='carousel' responsive={responsive}>
          {relatedList.map((product, i) => <RelatedCard key={i} item={product}/>)}
        </Carousel>
      }
    </React.Fragment>
  );
};

export default RelatedProducts;
