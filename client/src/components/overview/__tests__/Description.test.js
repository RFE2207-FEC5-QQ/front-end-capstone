import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Description from '../Description.jsx';

var mockProduct = {
  campus: "hr-rfe",
  category: "Kicks",
  created_at: "2021-08-13T14:37:33.145Z",
  default_price: "99.00",
  description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes",
  features: [{feature: 'Sole', value: 'Rubber'}, {feature: 'Material', value: 'FullControlSkin'}],
  id: 37315,
  name: "Heir Force Ones",
  slogan: "A sneaker dynasty",
  updated_at: "2021-08-13T14:37:33.145Z"
}

describe('Description', function() {
  render(<Description product={mockProduct}/>)
  test('should render', () => {
    expect(screen.getByText('A sneaker dynasty')).toBeInTheDocument();
  })
})