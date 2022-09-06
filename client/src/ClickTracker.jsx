import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClickTracker = ({ widget, render }) => {

  const handleClick = (e) => {
    let data = {
      time: new Date(),
      element: e.target.outerHTML.toString(),
      widget: widget
    };
    axios.post('/interactions', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    document.getElementById(widget).addEventListener('click', handleClick);
  }, [])

  return (
    <>
      {render(handleClick)}
    </>
  )
}

export default ClickTracker;