import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';
import RelatedCard from '../cards/RelatedCard.jsx';
import { Paper, Button, Box } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 900 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 900, min: 550 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1
  }
};

const RelatedProducts = ({ onClick, productId, product, modes }) => {
  const [relatedList, setRelatedList] = useState(null);
  const modalIcon = StarBorderOutlinedIcon;
  const { psychMode } = modes;

  useEffect(() => {
    axios
      .get('/related', {
        params: {
          productId,
        }
      })
      .then((results) => {
        const relatedIds = [...new Set(results.data)];
        if (relatedIds.includes(productId)) {
          relatedIds.splice(relatedIds.indexOf(productId), 1);
        }
        setRelatedList(relatedIds);
      })
      .catch((err) => {
        throw ('Error fetching related products', productId);
      });
  }, [productId, product]);

  return (
    <div id='related' className='related-products'>
      <div className='related-header'>Related Products</div>
      {relatedList
        ? <Carousel className='carousel' responsive={responsive}>
          {relatedList.map((relProduct, i) =>
            <RelatedCard
              onClick={onClick}
              key={i}
              item={relProduct}
              mainProduct={product}
              modal='related'/>)}
        </Carousel>
        : <div aria-label='progress-icon' className='progress-icon'>
          <CircularProgress sx={{ color: 'black' }}/>
        </div>
      }
    </div>
  );
};

export default RelatedProducts;