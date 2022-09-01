import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation.jsx';


describe('Testing dark theme toggle button', () => {

  it('Should show light icon and not dark icon when dark mode is off', () => {
    const darkOff = {darkMode: false, punkMode: false, psychMode: false};
    const toggleThemes = {
      toggleDark: null,
      toggleGod: null,
      toggleLudi: null,
      togglePsych: null,
      togglePunk: null
    };
    render(<Navigation modes={darkOff} toggleTheme={toggleThemes}/>);
    expect(screen.queryByLabelText('light-icon')).toBeInTheDocument();
    expect(screen.queryByLabelText('dark-icon')).not.toBeInTheDocument();
  });

  it('Should show dark icon and not light icon when dark mode is on', () => {
    const darkOn = {darkMode: true, punkMode: false, psychMode: false};
    const toggleThemes = {
      toggleDark: null,
      toggleGod: null,
      toggleLudi: null,
      togglePsych: null,
      togglePunk: null
    };
    render(<Navigation modes={darkOn} toggleTheme={toggleThemes}/>);
    expect(screen.queryByLabelText('light-icon')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('dark-icon')).toBeInTheDocument();
  });

});