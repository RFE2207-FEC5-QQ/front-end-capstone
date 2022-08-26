import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Info from '../overview/info.jsx';
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
        console.log('data from getProducts: ', res.data);
        setProducts(prev => res.data);
      })
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className='view-overview'>
      <Info product={products[1]}/>
    </div>
  );
};

export default Overview;
