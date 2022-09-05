import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Style from '../Style.jsx';

var mockSelectedStyle = {
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

var mockStyles = [
  {
    name: "White & White",
    original_price: "99.00",
    photos: [
      {thumbnail_url: 'https://images.unsplash.com/photo-1544441892-79416…be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1544441892-79416…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'},
      {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
    ],
    sale_price: null,
    style_id: 221023
  },
  {
    name: "White & Black",
    original_price: "99.00",
    photos: [
      {thumbnail_url: 'https://images.unsplash.com/photo-1544441892-79416…be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1544441892-79416…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'},
      {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
    ],
    sale_price: null,
    style_id: 221024
  }
]

var mockStylesNoPic = [
  {
    name: "White & White",
    original_price: "99.00",
    photos: [
      {thumbnail_url: null, url: null},
      {thumbnail_url: null, url: null}
    ],
    sale_price: null,
    style_id: 221023
  },
  {
    name: "White & Black",
    original_price: "99.00",
    photos: [
      {thumbnail_url: null, url: null},
      {thumbnail_url: null, url: null}
    ],
    sale_price: null,
    style_id: 221024
  }
]

describe('Style Rendering', function() {
  test('should render 2 images', () => {
    render(<Style styles={mockStyles} selectedStyle={mockSelectedStyle} updateStyle={() => {}} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  test('should render images with null photos', () => {
    render(<Style styles={mockStylesNoPic} selectedStyle={mockSelectedStyle} updateStyle={() => {}} />);
    expect(screen.getAllByTestId('ImageNotSupportedIcon')).toHaveLength(2);
  })
})

describe('Style Click', function() {
  var user = userEvent.setup();

  test('clicking on a style should make it checked', () => {
    render(<Style styles={mockStyles} selectedStyle={mockSelectedStyle} updateStyle={() => {}} />);
    var secondImage = screen.getAllByRole('img')[1]
    user.click(secondImage)
      .then(() => {
        expect(secondImage).toHaveClass('checked-image');
      })
  })
})