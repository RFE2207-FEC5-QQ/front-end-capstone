import React, { useState, useEffect } from 'react'; // React module is imported if you choose to convert to class component, remove the import if not
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Easel from '../../../public/icons/Easel_gold.svg';

const Navigation = ({ modes, toggleTheme }) => {
  const { darkMode, punkMode, psychMode } = modes;
  const { toggleDark, toggleGod, togglePunk, toggleLudi, togglePsych } = toggleTheme;
  const [oldFocusedId, setOldFocusedId] = useState('home-head');
  const [newFocusedId, setNewFocusedId] = useState('');

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

  const toggleFocus = (e) => {
    setNewFocusedId(e.target.id);
  };

  useEffect(() => {
    const oldHead = document.getElementById(oldFocusedId);
    const currentHead = document.getElementById(newFocusedId);

    if (!currentHead) {
      oldHead.classList.toggle('header-focused');
      // oldHead.classList.remove('nav-info');
    }
    if (currentHead) {
      if (newFocusedId !== oldFocusedId) {
        oldHead.classList.toggle('header-focused');
        currentHead.classList.toggle('header-focused');
        setOldFocusedId(newFocusedId);
      }
    }
  }, [newFocusedId]);

  return (
    <React.Fragment>
      <div className='nav-bar'>
        <div className={`main-header ${onPsych} ${punkedOut}`}>
          <img className='logo' alt='logo' src={Easel}></img>
          <div className='title'>
            <span onClick={togglePunk}>A</span>
            S
            <span onClick={togglePsych}>T</span>
            ELLE
          </div>
        </div>
        <div className='secondary-header secondary-header-pad'>
          <div className={`secondary-header ${onPsych}`}>
            <a
              href='#overview'
              id='home-head'
              onClick={toggleFocus}
              className={`nav-info ${punkedOut}`}
            >Home</a>
            <a
              href='#related'
              id='related-head'
              onClick={toggleFocus}
              className={`nav-info ${punkedOut}`}
            >Related Products</a>
            <a
              href='#questions'
              id='question-head'
              onClick={toggleFocus}
              className={`nav-info ${punkedOut}`}
            >Questions</a>
            <a
              href='#reviews'
              id='review-head'
              onClick={toggleFocus}
              className={`nav-info ${punkedOut}`}
            >Reviews</a>
            <a
              href='#contact'
              id='contact-head'
              onClick={toggleFocus}
              className={`nav-info ${punkedOut}`}
            >Contact</a>
            {/* <div className='top-bar-container'> */}
            {darkMode
              ? <DarkModeOutlinedIcon
                aria-label='dark-icon'
                className={`theme-icon`}
                onClick={ toggleDark }
              />
              : <LightModeOutlinedIcon
                aria-label='light-icon'
                className={`theme-icon`}
                onClick={ toggleDark }
              />
            }
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className='bg-color-placeholder'></div>
    </React.Fragment>
  );
};

export default Navigation;