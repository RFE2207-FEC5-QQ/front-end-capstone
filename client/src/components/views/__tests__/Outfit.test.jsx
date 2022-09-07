import React from 'react';
import { cleanup, waitFor, render, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Outfit from '../Outfit.jsx';

jest.mock('../../cards/RelatedCard.jsx');
const user = userEvent.setup();

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get: () => 100,
    },
  });
});


describe('Testing outfit functionality', () => {

  it('Should render Outfit Carousel and add button', async () => {
    render(<Outfit productId={37311}/>);
    await waitFor(() => expect(screen.getByLabelText('add-outfit')).toBeInTheDocument());
  });

  it('Should add outfit when user clicks on add button, then remove it', async () => {
    render(<Outfit productId={37311}/>);

    const addButton = screen.getByLabelText('add-outfit');

    expect(screen.queryByRole('button', {name: 'Related Cards Mock'})).not.toBeInTheDocument();
    return user.click(addButton)
      .then(async () => {
        await waitFor(() => expect(screen.queryByRole('button', {name: 'Related Cards Mock'})).toBeInTheDocument());
      })
      .then(() => {
        return user.click(screen.queryByRole('button', {name: 'Related Cards Mock'}))
          .then(async () => {
            await waitFor(() => expect(screen.queryByRole('button', {name: 'Related Cards Mock'})).not.toBeInTheDocument());
          });
      });
  });
});