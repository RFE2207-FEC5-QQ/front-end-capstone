import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Description = ({ product }) => {

  const [info, setInfo] = useState({});

  const getProductInfo = (id) => {
    var options = {
      method: 'get',
      url: '/info',
      params: {
        id: id
      }
    }
    axios(options)
      .then(res => {
        setInfo(res.data)
      })
  }

  useEffect(() => {
    getProductInfo(product.id)
  }, [])

  if (Object.keys(info).length) {
    return(
      <div className='overview-description'>
        <div className='product-slogan'>
          {product.slogan}
        </div>
        <div className='product-description'>
          {product.description}
        </div>
        <ul className='product-features'>
          {info.features.map(feat => {
            return (
              <li key={feat.feature}>
                <div>{feat.feature} - {feat.value}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Description;