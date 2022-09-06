import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Comparison from '../Comparison.jsx';

describe('Testing related products functionality)', () => {

  const user = userEvent.setup();

  it('Should show comparison popup with title and header when user clicks modal icon', () => {
    const mainProd = {name: 'Yong', features: []};
    const currProd = {name: 'Yong 2', features: []};

    render(<Comparison mainProduct={mainProd} currProduct={currProd}/>);
    expect(screen.getByLabelText('star-icon')).toBeInTheDocument();
    expect(screen.queryByText('COMPARING')).not.toBeInTheDocument();
    const openModal = document.querySelector('.modal-button');
    return user.click(openModal)
      .then(() => {
        expect(screen.queryByText('COMPARING')).toBeInTheDocument();
        expect(screen.queryByText('Yong')).toBeInTheDocument();
        expect(screen.queryByText('Yong 2')).toBeInTheDocument();
      });

  });

  it('Should render three features and values for main and current product', async () => {
    const features1 = [
      {feature: 'feature 1', value: 'value 1'},
      {feature: 'feature 2', value: 'value 2'},
      {feature: 'feature 3', value: 'value 3'},
    ];

    const features2 = [
      {feature: 'feature 1', value: 'value 4'},
      {feature: 'feature 2', value: 'value 5'},
      {feature: 'feature 3', value: 'value 6'},
    ];

    const mainProd = {name: 'Yong', features: features1};
    const currProd = {name: 'Yong 2', features: features2};

    render(<Comparison mainProduct={mainProd} currProduct={currProd}/>);

    const openModal = document.querySelector('.modal-button');
    return user.click(openModal)
      .then(() => {
        expect(document.querySelector('.comparison-contents')).toBeInTheDocument();
        expect(screen.queryByText('feature 1')).toBeInTheDocument();
        expect(screen.queryByText('feature 2')).toBeInTheDocument();
        expect(screen.queryByText('feature 3')).toBeInTheDocument();
        expect(screen.queryByText('value 1')).toBeInTheDocument();
        expect(screen.queryByText('value 2')).toBeInTheDocument();
        expect(screen.queryByText('value 3')).toBeInTheDocument();
        expect(screen.queryByText('value 4')).toBeInTheDocument();
        expect(screen.queryByText('value 5')).toBeInTheDocument();
        expect(screen.queryByText('value 6')).toBeInTheDocument();
      });
  });


});