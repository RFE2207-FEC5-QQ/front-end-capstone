import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Comparison from '../Comparison.jsx';

describe('Testing related products functionality)', () => {

  it('Should show comparison popup with COMPARING title', () => {
    const mainProd = {name: 'Yong', features: []};
    const currProd = {name: 'Yong again', features: []};

    render(<Comparison mainProduct={mainProd} currProduct={currProd}/>);
    screen.debug();
    expect(screen.queryByText('COMPARING')).toBeInTheDocument;
  });

  it('Should render three features and values for main and current product', async () => {
    const features = [
      {feature: 'feature 1', value: 'value 1'},
      {feature: 'feature 2', value: 'value 2'},
      {feature: 'feature 2', value: 'value 3'},
    ];
    const mainProd = {name: 'Yong', features: features};
    const currProd = {name: 'Yong again', features: features};

    render(<Comparison mainProduct={mainProd} currProduct={currProd}/>);
    expect(screen.queryByText('COMPARING')).toBeInTheDocument;

  });


});