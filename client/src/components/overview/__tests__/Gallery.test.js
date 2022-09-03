import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Gallery from '../Gallery.jsx';

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

describe('Gallery Default View', function() {
  test('should render all images', () => {
    render(<Gallery product={mockProduct} selectedStyle={mockStyle} updateView={() => {}} defaultView={true}/>)
    expect(screen.getAllByRole('img')).toHaveLength(5);
  })
})

describe('Gallery Expanded View', function() {
  test('should render 1 image', () => {
    render(<Gallery product={mockProduct} selectedStyle={mockStyle} updateView={() => {}} defaultView={false}/>)
    expect(screen.getByRole('img')).toBeInTheDocument();
  })
})

describe('Gallery Zoomed View', function() {
  var user = userEvent.setup();
  test('should render 1 image', () => {
    render(<Gallery product={mockProduct} selectedStyle={mockStyle} updateView={() => {}} defaultView={false}/>)
    return user.click(screen.getByRole('img'))
      .then(() => {
        expect(document.getElementsByClassName('zoom-image-container')).toHaveLength(1);
      })
      .then(() => {
        user.click(screen.getByRole('img'))
          .then(() => {
            expect(document.getElementsByClassName('expanded-image-container')).toHaveLength(1);
          })
      })
  })
})