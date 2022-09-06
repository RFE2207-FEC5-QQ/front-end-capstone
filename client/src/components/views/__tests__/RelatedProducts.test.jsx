import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RelatedProducts from '../RelatedProducts.jsx';

jest.mock('../../cards/RelatedCard.jsx');

beforeEach(() => {
  jest.clearAllMocks();

  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get: () => 100,
    },
  });
});

const clickHandler = jest.fn();
const user = userEvent.setup();
const modes = {
  darkMode: null,
  psychMode: null,
  punkMode: null,
};

describe('Testing related products functionality)', () => {

  it('Should render Related Products Carousel', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: [37311, 37312, 37313] });

    render(<RelatedProducts onClick={clickHandler} modes={modes}/>);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getAllByText('Related Cards Mock').length).toBe(3));
  });

});