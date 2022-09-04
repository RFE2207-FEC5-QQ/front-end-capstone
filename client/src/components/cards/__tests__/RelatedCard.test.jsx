import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RelatedCard from '../RelatedCard.jsx';

jest.mock('axios');
// jest.mock('../Comparison.jsx', () => () => (<div>Hello World</div>));
jest.mock('../Comparison.jsx');

describe('Testing RelatedCard render', () => {

  const clickHandler = jest.fn();
  const user = userEvent.setup();

  const mainProduct = {
    name: 'Yong',
    category: 'human',
  };


  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('Should not render card if product info not fetched', async () => {
  //   jest.spyOn(axios, 'get').mockResolvedValue({data: null});
  //   render(<RelatedCard onClick={clickHandler} modal='related'/>);

  //   await waitFor(() => expect(screen.getByLabelText('progress-icon')).toBeInTheDocument());
  //   await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  //   await waitFor(() => expect(screen.queryByText('Yong')).not.toBeInTheDocument());
  // });

  it('Should render card if product info, styles, and ratings are all fetched', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        name: 'Yong',
        default_price: 500,
        results: [{photos: [{
          thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        }]}],
        ratings: {5: 1},
      }
    });

    render(<RelatedCard onClick={clickHandler} modal='related'/>);

    await waitFor(() => expect(screen.getByLabelText('progress-icon')).toBeInTheDocument());
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
    await waitFor(() => {
      screen.debug();
      expect(screen.queryByText('Yong')).toBeInTheDocument();
    });
  });

});


// describe('Testing click functionality', () => {

//   it('Should call click handler once on icon if related card is an outfit item', () => {
//     user.click(screen.getByLabelText('close-outfit-card'))
//       .then(() => {
//         expect(clickHandler.mock.calls.length).toBe(1);
//       });
//   });
// });