import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Cart from '../Cart.jsx';

describe('Cart', function() {

  test('Should render', () => {
    render(<Cart />)
    expect(screen.queryByText(/OUT OF STOCK/)).toBeInTheDocument;
  });
});