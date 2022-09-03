import React from 'react';
import { render, screen } from '@testing-library/react';

// import (COMPONENT) from '../src/components/views/(COMPONENT).jsx';


describe('(x) React component tests', () => {

  beforeEach(() => {
    render(/*<COMPONENT>*/);
  });

  test('Expect (y) to be (z)', () => {
    expect(/*(y)*/).toBe(/*(z)*/);
  });

});
