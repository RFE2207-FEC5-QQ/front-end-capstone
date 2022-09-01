import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Overview from '../Overview.jsx';

describe('Overview', function() {

  test('Should render', async () => {
    render(<Overview />)
    await waitFor(() => expect(screen.getByText('Heir')).toBeInTheDocument())
      .then(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      })
  });
});
