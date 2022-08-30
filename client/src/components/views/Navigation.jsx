import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';

const Navigation = ({ modes, toggleTheme }) => {
  const { punkMode, psychMode } = modes;
  const { toggleDark, toggleGod, togglePunk, toggleLudi, togglePsych } = toggleTheme;

  let onPsych = '';
  let punkedOut = '';

  if (psychMode) {
    onPsych = 'psychedelic-mode';
  } else {
    onPsych = '';
  }

  if (punkMode) {
    punkedOut = 'punk-mode layer glitch';
  } else {
    punkedOut = '';
  }

  console.log(modes);
  return (
    <div className={`nav-bar ${onPsych}`}>
      <span onClick={toggleGod}>God Mode </span>
      <span onClick={togglePunk}>Punk Mode </span>
      <span onClick={toggleLudi}>Ludicrous Mode </span>
      <span onClick={togglePsych}>Psychedelic Mode </span>
      <FormControlLabel
        control={<Switch onChange={ toggleDark } color='default' sx={{ m: 0 }}/>}
      />
      <div className={`main-header ${onPsych} ${punkedOut}`}>
        {/* <h1 className='layer glitch'>ATELIER</h1> */}
        <div className=''>ATELIER</div>
      </div>
      <hr className='solid'/>
      <div className={`secondary-header ${onPsych} ${punkedOut}`}>
        <div>PRODUCT DETAIL</div>
        <div>RELATED PRODUCTS</div>
        <div>QUESTIONS</div>
        <div>REVIEWS</div>
      </div>
      <hr className='solid'/>
    </div>
  );
};

export default Navigation;
