import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Paper, Button, Box } from '@mui/material';
import RelatedCard from '../cards/RelatedCard.jsx';
import Carousel from 'react-multi-carousel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
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

const Outfit = ({ productId }) => {
  const [outfits, setOutfits] = useState([]);
  const modalIcon = CloseIcon;

  useEffect(() => {
    const storedOutfit = JSON.parse(localStorage.getItem('outfits'));
    console.log('local stored outfit data:', storedOutfit);
    if (storedOutfit) {
      setOutfits(storedOutfit);
    }
  }, []);

  const addOutfit = () => {
    if (!outfits.includes(productId)) {
      localStorage.setItem('outfits', JSON.stringify([...outfits, productId]));
      setOutfits([...outfits, productId]);
    }
  };

  const removeOutfit = (item) => {
    const updatedOutfits = outfits.filter((outfit) => outfit !== item);
    console.log(updatedOutfits);
    localStorage.setItem('outfits', JSON.stringify([...updatedOutfits]));
    setOutfits([...updatedOutfits]);
  };

  const outfitCards = [
    <div className='add-outfits-btn-container related-card'>
      <AddBoxIcon className='add-outfits-btn' fontSize='large' onClick={addOutfit}/>
    </div>,
    ...outfits.map((product, i) => (
      <RelatedCard key={i} item={product} modal='outfit' onClick={removeOutfit}/>))
  ];

  return (
    <React.Fragment>
      <div className='related-header'>Your Outfit</div>
      <Carousel className='carousel' responsive={responsive}>
        {outfitCards}
      </Carousel>
    </React.Fragment>
  );
};

export default Outfit;
