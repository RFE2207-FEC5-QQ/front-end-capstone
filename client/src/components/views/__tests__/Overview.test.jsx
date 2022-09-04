import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Overview from '../Overview.jsx';
import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:3000';
// import mockAxios from 'axios';

// jest.mock('axios');
// mockAxios.mockImplementation(() => Promise.resolve({
//   data: [{campus: "hr-rfe",
//     category: "Jackets",
//     default_price: "140.00",
//     description: "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     id: 37311,
//     name: "Camo Onesie",
//     slogan: "Blend in to your crowd"
//   }]
// }))

xdescribe('Overview', function() {
  const user = userEvent.setup();
  render(<Overview productId={37311}/>);

  test('should render with data', () => {
    return waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument())
      .then(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      })
  })
})