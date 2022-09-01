import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Overview from '../Overview.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

describe('Overview', function() {
  render(<Overview />)

  test('Should render', () => {
    let item = document.getElementsByClassName('waiting');
    expect(item).toHaveLength(1);
  });
});
