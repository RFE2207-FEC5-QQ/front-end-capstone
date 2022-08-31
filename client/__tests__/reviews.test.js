import React from 'react';
import { render, screen } from '@testing-library/react';

import Reviews from '../src/components/views/Reviews.jsx';

const productId = 37311;
// const reviews = [
//   {
//     'review_id': 1275440,
//     'rating': 5,
//     'summary': 'This is a summary...',
//     'recommend': true,
//     'response': 'Hey just responding to your review, we love it!',
//     'body': 'Let me tell you about being a cat, it isn\'t always great! Consectetur voluptate sit cillum in occaecat sit. Commodo ipsum ad adipisicing adipisicing. Cupidatat non esse elit proident duis incididunt laborum. Laboris eiusmod in pariatur. Excepteur sint occaecat ullamco cillum ea minim deserunt. Officia labore id sunt consectetur amet eiusmod. Mollit do nisi ipsum aute. Laborum eiusmod occaecat sunt enim enim laborum.',
//     'date': '2022-07-15T00:00:00.000Z',
//     'reviewer_name': 'An Actual Real Life Cat',
//     'helpfulness': 2,
//     'photos': [
//       {
//         'id': 2455345,
//         'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
//       },
//       {
//         'id': 1111111,
//         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
//       },
//       {
//         'id': 1111112,
//         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
//       },
//       {
//         'id': 1111113,
//         'url': 'https://i.imgur.com/EPHb3G6.jpeg'
//       },
//       {
//         'id': 2455346,
//         'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
//       }
//     ]
//   }
// ];

describe('\'ReviewList\' React component', () => {

  beforeEach(() => {
    render(<Reviews productId={productId}/>);
  });

  test('Expect review list to be present', () => {
    let items = document.getElementsByClassName('review-list');
    expect(items).toHaveLength(1);
  });

  test('Expects there to be 1 review posted', () => {
    let items = document.getElementsByClassName('review');
    expect(items).toHaveLength(1);
  });

  test('Expects the summary text to be visible on screen', async () => {
    let item = await screen.getByText('This is a summary...');
    expect(item).toBeTruthy();
  });

});
