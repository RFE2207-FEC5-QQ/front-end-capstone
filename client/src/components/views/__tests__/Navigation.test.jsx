import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation.jsx';


describe('Testing dark theme toggle button', () => {
  const user = userEvent.setup();
  const darkOff = {darkMode: false, punkMode: false, psychMode: false};
  const darkOn = {darkMode: true, punkMode: false, psychMode: false};
  const darkToggle = {darkMode: false, punkMode: false, psychMode: false};

  const mockDarkToggle = jest.fn(() => darkToggle.darkMode = !darkToggle.darkMode);
  const toggleThemes = {
    toggleDark: mockDarkToggle,
    toggleGod: null,
    toggleLudi: null,
    togglePsych: null,
    togglePunk: null
  };

  it('Should show light icon and not dark icon when dark mode is off', () => {
    render(<Navigation modes={darkOff} toggleTheme={toggleThemes}/>);
    expect(screen.queryByLabelText('light-icon')).toBeInTheDocument();
    expect(screen.queryByLabelText('dark-icon')).not.toBeInTheDocument();
  });

  it('Should show dark icon and not light icon when dark mode is on', () => {
    render(<Navigation modes={darkOn} toggleTheme={toggleThemes}/>);
    expect(screen.queryByLabelText('light-icon')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('dark-icon')).toBeInTheDocument();
  });

  it('Should call toggleDark handler once when user clicks light icon', () => {
    render(<Navigation modes={darkOff} toggleTheme={toggleThemes}/>);
    return user.click(screen.getByLabelText('light-icon'))
      .then(() => {
        expect(mockDarkToggle.mock.calls.length).toBe(1);
      });
  });

  it('Should call toggleDark handler once when user clicks dark icon', () => {
    render(<Navigation modes={darkOn} toggleTheme={toggleThemes}/>);
    return user.click(screen.getByLabelText('dark-icon'))
      .then(() => {
        expect(mockDarkToggle.mock.calls.length).toBe(1);
      });
  });

  it('Should change to dark icon when user clicks light icon', () => {
    const { rerender } = render(<Navigation modes={darkToggle} toggleTheme={toggleThemes}/>);
    const lightIcon = screen.getByLabelText('light-icon');
    return user.click(lightIcon)
      .then(() => {
        rerender(<Navigation modes={darkToggle} toggleTheme={toggleThemes}/>);
        expect(screen.queryByLabelText('dark-icon')).toBeInTheDocument();
      });
  });

  it('Should change to light icon when user clicks dark icon', () => {
    const { rerender } = render(<Navigation modes={darkToggle} toggleTheme={toggleThemes}/>);
    const darkIcon = screen.getByLabelText('dark-icon');
    return user.click(darkIcon)
      .then(() => {
        rerender(<Navigation modes={darkToggle} toggleTheme={toggleThemes}/>);
        expect(screen.queryByLabelText('light-icon')).toBeInTheDocument();
      });
  });

});