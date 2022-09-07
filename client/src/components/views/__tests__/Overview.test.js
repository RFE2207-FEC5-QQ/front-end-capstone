import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Overview from '../Overview.jsx';
import mockAxios from 'axios';

jest.mock('axios');
var result = {
  data: {
    "product_id": "37315",
    "results": [
      {
        "style_id": 221023,
        "name": "White & White",
        "original_price": "99.00",
        "sale_price": null,
        "default?": true,
        "photos": [
          {
              "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
              "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
          }
        ],
        "skus": {
          "1281158": {
              "quantity": 14,
              "size": "7"
          }
        }
      }
    ]
  }
}
mockAxios.mockImplementation((id) => Promise.resolve(result));

describe('Overview', function() {
  test('should render', () => {
    act(() => {
      render(<Overview productId={37311}/>)
    })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})