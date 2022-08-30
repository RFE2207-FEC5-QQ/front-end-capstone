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
  const { psychMode } = modes;
  const { toggleDark, toggleGod, toggleLudi, togglePsych } = toggleTheme;

  console.log(modes);

  let onPsych = '';
  if (psychMode) {
    onPsych = 'psychedelic-mode';
  } else {
    onPsych = '';
  }

  console.log(modes);
  return (
    <div className={`nav-bar ${onPsych}`}>
      <span onClick={toggleGod}>God Mode </span>
      <span onClick={toggleLudi}>Ludicrous Mode </span>
      <span onClick={togglePsych}>Psychedelic Mode</span>
      <FormControlLabel
        control={<Switch onChange={ toggleDark } color='default' sx={{ m: 0 }}/>}
      />
      <div className={`main-header ${onPsych}`}>
        <h1 className={`layer glitch`}>ATELIER</h1>
      </div>
      <hr className='solid'/>
      <div className={`secondary-header layer glitch ${onPsych}`}>
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
