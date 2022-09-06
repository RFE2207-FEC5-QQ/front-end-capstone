import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Outfit from '../Outfit.jsx';

const clickHandler = jest.fn();

describe('Testing outfit functionality', () => {

  it('Should render Outfit Carousel', async () => {
    render(<Outfit productId={37311}/>);
    screen.debug();
    await waitFor(() => expect(document.querySelector('.carousel')).toBeInTheDocument());
  });

});