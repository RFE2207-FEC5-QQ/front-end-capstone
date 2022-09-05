import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Cart from '../Cart.jsx';

var mockSkus = {
  1281158: {quantity: 14, size: '7'},
  1281159: {quantity: 25, size: '7.5'},
  1281160: {quantity: 9, size: '8'},
  1281161: {quantity: 2, size: '8.5'},
  1281162: {quantity: 18, size: '9'},
  1281163: {quantity: 12, size: '9.5'},
  1281164: {quantity: 10, size: '10'},
  1281165: {quantity: 18, size: '10.5'},
  1281166: {quantity: 11, size: '11'},
  1281167: {quantity: 35, size: '11.5'},
  1281168: {quantity: 25, size: '12'}
}
var mockStyle = {
  name: "White & White",
  original_price: "99.00",
  photos: [
    {thumbnail_url: 'https://images.unsplash.com/photo-1544441892-79416…be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1544441892-79416…e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'},
    {thumbnail_url: 'https://images.unsplash.com/photo-1514590734052-34…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80', url: 'https://images.unsplash.com/photo-1514590734052-34…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'}
  ],
  sale_price: null,
  skus: mockSkus,
  style_id: 221023
}

var mockSkus2 = {
  null: {quantity: null, size: null}
};

describe('Cart', function() {
  var user = userEvent.setup();
  test('Should have Add to Cart button with skus', () => {
    render(<Cart selectedStyle={mockStyle} skus={mockSkus}/>);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  })

  test('Should have Out of Stock button without skus', () => {
    render(<Cart selectedStyle={mockStyle} skus={mockSkus2} />);
    expect(screen.getByText('OUT OF STOCK')).toBeInTheDocument();
  })

  test('Update size', () => {
    render(<Cart selectedStyle={mockStyle} skus={mockSkus}/>);

    let selectValue = screen.getAllByDisplayValue('')[0];
    fireEvent.change(selectValue, {target: {value: '7.5'}});
    expect(selectValue.value).toBe('7.5');
  })
})