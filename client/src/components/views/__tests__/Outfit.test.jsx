import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Outfit from '../Outfit.jsx';

jest.mock('../../cards/RelatedCard.jsx');
const user = userEvent.setup();

beforeEach(() => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get: () => 100,
    },
  });

  render(<Outfit productId={37311}/>);
});

describe('Testing outfit functionality', () => {

  it('Should render Outfit Carousel and add button', async () => {
    await waitFor(() => expect(screen.getByLabelText('add-outfit')).toBeInTheDocument());
  });

  it('Should add outfit when user clicks on add button', async () => {
    const addButton = screen.getByLabelText('add-outfit');
    return user.click(addButton)
      .then(async () => {
        await waitFor(() => expect(screen.getByText('Related Cards Mock')).toBeInTheDocument());
      });
  });

  // Not working yet.

  // it('Should remove outfit when user clicks on close button', async () => {
  //   const removeButton = screen.getByRole('button', {name: 'Related Cards Mock'});
  //   expect(removeButton).toBeInTheDocument();
  //   return user.click(removeButton)
  //     .then(async () => {
  //       await waitFor(() => expect(screen.getByText('Related Cards Mock')).not.toBeInTheDocument());
  //     });
  // });


});