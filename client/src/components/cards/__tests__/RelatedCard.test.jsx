import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RelatedCard from '../RelatedCard.jsx';

jest.mock('../Comparison.jsx');

beforeEach(() => {
  jest.clearAllMocks();
});

const clickHandler = jest.fn();
const user = userEvent.setup();

describe('Test render of Related Cards', () => {

  it('Should render card if product info, styles, and ratings are all fetched', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        name: 'Yong',
        default_price: 500,
        results: [{photos:
          [{
            thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
          }]
        }],
        ratings: {5: 1},
      }
    });
    render(<RelatedCard onClick={clickHandler} modal='related'/>);
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(screen.findByText('Yong')).toBeInTheDocument());
  });

  it('Should render card if no ratings or photos are fetched', async () => {
    // jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: null}));
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        name: 'Yong',
        default_price: 500,
        results: [{photos:
          [{
            thumbnail_url: null
          }]
        }],
        ratings: null,
      }
    });

    render(<RelatedCard onClick={clickHandler} modal='related'/>);

    expect(screen.getByLabelText('progress-icon')).toBeInTheDocument();
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(screen.queryByText('Yong')).not.toBeInTheDocument());
  });

  // it('Should not render card if APi calls are rejected', async () => {
  //   // jest.spyOn(axios, 'get').mockRejectedValue(new Error('Async fetch error'));
  //   jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('Error')));

  //   render(<RelatedCard onClick={clickHandler} modal='related'/>);

  //   await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  //   // expect(screen.getByLabelText('progress-icon')).toBeInTheDocument();
  //   // await waitFor(() => expect(screen.queryByText('Yong')).not.toBeInTheDocument());
  // });

});