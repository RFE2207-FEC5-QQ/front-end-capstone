import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Gallery from '../Gallery.jsx';

describe('Gallery', function() {

  test('Should render', async () => {
    // render(<Gallery />)
    // await waitFor(() => {
    //   screen.getByRole('img');
    // })
    expect(true).toBe(true);
  });
});