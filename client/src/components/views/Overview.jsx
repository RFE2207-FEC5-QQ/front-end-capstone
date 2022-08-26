import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Info from '../overview/Info.jsx';
import Style from '../overview/Style.jsx';
import Cart from '../overview/Cart.jsx';
import Description from '../overview/Description.jsx';
import Gallery from '../overview/Gallery.jsx';
// React module is imported if you choose to convert to class component, remove the import if not

const Overview = () => {

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    var options = {
      method: 'get',
      url: '/details',
    }
    axios(options)
      .then(res => {
        setProducts(res.data);
      })
  }

  useEffect(() => {
    getProducts();
  }, [])

  if (products.length) {
    return (
      <div className='view-overview'>
        <Gallery />
        <Info product={products[0]}/>
        <Style />
        <Cart />
        <Description />
      </div>
    );
  }
};

export default Overview;
