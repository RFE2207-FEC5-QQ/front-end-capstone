import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navigation from '../Navigation.jsx';

jest.mock('../../../../public/icons/Easel_gold.svg', () => 'Easel svg mock');

beforeEach(() => {
  jest.clearAllMocks();
});

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

describe('Testing navigation links', () => {
  const user = userEvent.setup();
  const darkToggle = {darkMode: false, punkMode: false, psychMode: false};
  const toggleThemes = {
    toggleDark: null,
    toggleGod: null,
    toggleLudi: null,
    togglePsych: null,
    togglePunk: null
  };

  beforeEach(() => {
    render(<Navigation modes={darkToggle} toggleTheme={toggleThemes}/>);
  });

  it ('Home header should have link to homepage and be focused by default.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home'});
    const relatedLink = screen.getByRole('link', { name: 'Related Products'});
    const questionsLink = screen.getByRole('link', { name: 'Questions'});
    const reviewsLink = screen.getByRole('link', { name: 'Reviews'});
    const contactLink = screen.getByRole('link', { name: 'Contact'});

    expect(homeLink).toHaveAttribute('href', '#overview');
    expect(homeLink).toHaveClass('header-focused');
    return user.click(homeLink)
      .then(() => {
        expect(homeLink).toHaveClass('header-focused');
        expect(relatedLink).not.toHaveClass('header-focused');
        expect(questionsLink).not.toHaveClass('header-focused');
        expect(reviewsLink).not.toHaveClass('header-focused');
        expect(contactLink).not.toHaveClass('header-focused');
      });
  });

  it ('Related Products header should be focused after user clicking.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home'});
    const relatedLink = screen.getByRole('link', { name: 'Related Products'});
    const questionsLink = screen.getByRole('link', { name: 'Questions'});
    const reviewsLink = screen.getByRole('link', { name: 'Reviews'});
    const contactLink = screen.getByRole('link', { name: 'Contact'});

    expect(homeLink).toHaveAttribute('href', '#overview');
    expect(homeLink).toHaveClass('header-focused');
    return user.click(relatedLink)
      .then(() => {
        expect(homeLink).not.toHaveClass('header-focused');
        expect(relatedLink).toHaveClass('header-focused');
        expect(questionsLink).not.toHaveClass('header-focused');
        expect(reviewsLink).not.toHaveClass('header-focused');
        expect(contactLink).not.toHaveClass('header-focused');
      });
  });

  it ('Questions header should be focused after user clicking.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home'});
    const relatedLink = screen.getByRole('link', { name: 'Related Products'});
    const questionsLink = screen.getByRole('link', { name: 'Questions'});
    const reviewsLink = screen.getByRole('link', { name: 'Reviews'});
    const contactLink = screen.getByRole('link', { name: 'Contact'});

    expect(homeLink).toHaveAttribute('href', '#overview');
    expect(homeLink).toHaveClass('header-focused');
    return user.click(questionsLink)
      .then(() => {
        expect(homeLink).not.toHaveClass('header-focused');
        expect(relatedLink).not.toHaveClass('header-focused');
        expect(questionsLink).toHaveClass('header-focused');
        expect(reviewsLink).not.toHaveClass('header-focused');
        expect(contactLink).not.toHaveClass('header-focused');
      });
  });

  it ('Reviews header should be focused after user clicking.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home'});
    const relatedLink = screen.getByRole('link', { name: 'Related Products'});
    const questionsLink = screen.getByRole('link', { name: 'Questions'});
    const reviewsLink = screen.getByRole('link', { name: 'Reviews'});
    const contactLink = screen.getByRole('link', { name: 'Contact'});

    expect(homeLink).toHaveAttribute('href', '#overview');
    expect(homeLink).toHaveClass('header-focused');
    return user.click(reviewsLink)
      .then(() => {
        expect(homeLink).not.toHaveClass('header-focused');
        expect(relatedLink).not.toHaveClass('header-focused');
        expect(questionsLink).not.toHaveClass('header-focused');
        expect(reviewsLink).toHaveClass('header-focused');
        expect(contactLink).not.toHaveClass('header-focused');
      });
  });

  it ('Contact header should be focused after user clicking.', () => {
    const homeLink = screen.getByRole('link', { name: 'Home'});
    const relatedLink = screen.getByRole('link', { name: 'Related Products'});
    const questionsLink = screen.getByRole('link', { name: 'Questions'});
    const reviewsLink = screen.getByRole('link', { name: 'Reviews'});
    const contactLink = screen.getByRole('link', { name: 'Contact'});

    expect(homeLink).toHaveAttribute('href', '#overview');
    expect(homeLink).toHaveClass('header-focused');
    return user.click(contactLink)
      .then(() => {
        expect(homeLink).not.toHaveClass('header-focused');
        expect(relatedLink).not.toHaveClass('header-focused');
        expect(questionsLink).not.toHaveClass('header-focused');
        expect(reviewsLink).not.toHaveClass('header-focused');
        expect(contactLink).toHaveClass('header-focused');
      });
  });



});