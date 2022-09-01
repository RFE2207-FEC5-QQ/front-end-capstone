import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Navigation = ({ modes, toggleTheme }) => {
  const { darkMode, punkMode, psychMode } = modes;
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
    <React.Fragment>
      <div className='nav-bar'>
        <div className='top-bar-container'>
          {darkMode
            ? <DarkModeOutlinedIcon
              aria-label='dark-icon'
              className='theme-icon'
              onClick={ toggleDark }
            />
            : <LightModeOutlinedIcon
              aria-label='light-icon'
              className='theme-icon'
              onClick={ toggleDark }
            />
          }
        </div>
        <div className={`main-header ${onPsych} ${punkedOut}`}>
          <div className=''>
            <span className={punkedOut} onClick={togglePunk}>A</span>
            t
            <span className={onPsych} onClick={togglePsych}>e</span>
            lier</div>
        </div>
        <div className={`secondary-header ${onPsych}`}>
          <div className={punkedOut}>Product Detail</div>
          <div className={punkedOut}>Related Products</div>
          <div className={punkedOut}>Questions</div>
          <div className={punkedOut}>Reviews</div>
        </div>
      </div>
      <div className='bg-color-placeholder'></div>
    </React.Fragment>
  );
};

export default Navigation;
