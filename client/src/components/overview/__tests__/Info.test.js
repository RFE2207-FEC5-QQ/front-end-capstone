import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Info from '../Info.jsx';
import axios from 'axios';

jest.mock('axios');
var result = {
  data: {
    ratings: {1: '33', 2: '7', 3: '19', 4: '14', 5: '17'}
  }
}
axios.mockImplementation(() => Promise.resolve(result));

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

var mockStyle = {
  name: "White & White",
  original_price: "99.00",
  photos: [
    {thumbnail_url: 'https://images.unsplash.com/photo-1544441892-79416…be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1544441892-79416…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
  ],
  sale_price: null,
  style_id: 221023
}

var mockSaleStyle = {
  name: "White & White",
  original_price: "99.00",
  photos: [
    {thumbnail_url: 'https://images.unsplash.com/photo-1544441892-79416…be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1544441892-79416…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
  ],
  sale_price: '40.00',
  style_id: 221023
}

describe('Info with no sale', function() {
  test('should render with original price', () => {
    act(() => {
      render(<Info product={mockProduct} selectedStyle={mockStyle} />);
    })
    expect(screen.getByText('$99.00')).toBeInTheDocument();
  })
})

describe('Info with sale', function() {
  test('should render with sale price', () => {
    act(() => {
      render(<Info product={mockProduct} selectedStyle={mockSaleStyle} />);
    })
    expect(screen.getByText('$40.00')).toBeInTheDocument();
  })
})

describe('axios testing', function() {
  test('should test for ratings', () => {
    act(() => {
      render(<Info product={mockProduct} selectedStyle={mockStyle} />)
    })
    expect((screen.getByRole('link'))).toBeInTheDocument();
  })
})
