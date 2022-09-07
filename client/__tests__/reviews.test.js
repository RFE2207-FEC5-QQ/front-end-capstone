import React from 'react';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';

import Reviews from '../src/components/views/Reviews.jsx';
import ReviewList from '../src/components/lists/ReviewList.jsx';

const characteristicChart = {
  Size: {
    1: 'A size too small',
    2: '1/2 a size too small',
    3: 'Perfect',
    4: '1/2 a size too big',
    5: 'A size too wide'
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide'
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect'
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'What I expected',
    4: 'Pretty great',
    5: 'Perfect'
  },
  Length: {
    1: 'Runs short',
    2: 'Runs slightly short',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  },
  Fit: {
    1: 'Runs tight',
    2: 'Runs slightly tight',
    3: 'Perfect',
    4: 'Runs slightly long',
    5: 'Runs long'
  }
};

const paletteMap = {
  '1': '#ff3333',
  '2': '#ff9966',
  '3': '#dfcc97',
  '4': '#66cce6',
  '5': '#90ee90'
};

const productId = 37311;
const reviews = [
  {
    'review_id': 1275440,
    'rating': 5,
    'summary': 'This is a summary...',
    'recommend': true,
    'response': 'Hey just responding to your review, we love it!',
    'body': 'Let me tell you about being a cat, it isn\'t always great! Consectetur voluptate sit cillum in occaecat sit. Commodo ipsum ad adipisicing adipisicing. Cupidatat non esse elit proident duis incididunt laborum. Laboris eiusmod in pariatur. Excepteur sint occaecat ullamco cillum ea minim deserunt. Officia labore id sunt consectetur amet eiusmod. Mollit do nisi ipsum aute. Laborum eiusmod occaecat sunt enim enim laborum.',
    'date': '2022-07-15T00:00:00.000Z',
    'reviewer_name': 'An Actual Real Life Cat',
    'helpfulness': 2,
    'photos': [
      {
        'id': 2455345,
        'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
      },
      {
        'id': 1111111,
        'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      },
      {
        'id': 1111112,
        'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      },
      {
        'id': 1111113,
        'url': 'https://i.imgur.com/EPHb3G6.jpeg'
      },
      {
        'id': 2455346,
        'url': 'http://res.cloudinary.com/dm84tjpoq/image/upload/v1657918306/vw1hfv268xkgpyfr0i04.jpg'
      }
    ]
  }
];
const reviewMeta = {
  'product_id': '37311',
  'ratings': {
    '1': '10',
    '2': '20',
    '3': '30',
    '4': '40',
    '5': '50'
  },
  'recommended': {
    'false': '75',
    'true': '75'
  },
  'characteristics': {
    'Fit': {
      'id': 125031,
      'value': '1.2'
    },
    'Length': {
      'id': 125032,
      'value': '3'
    },
    'Comfort': {
      'id': 125033,
      'value': '4'
    },
    'Quality': {
      'id': 125034,
      'value': '5'
    }
  }
};

describe('\'ReviewList\' React component', () => {

  // let getSpy;

  beforeEach(() => {
    // getSpy = jest.spyOn(axios, 'get')
    //   .mockImplementation((success) => Promise.resolve(reviews));
    render(<ReviewList
      reviews={reviews}
      sort={'newest'}
      getReviews={() => {}}
      openReviewModal={() => {}}
      handleSortChange={() => {}}
      handleMoreReviews={() => {}}
      paletteMap={paletteMap}
    />);
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  test('Expect review list to be present', () => {
    let items = document.getElementsByClassName('review-list');
    expect(items).toHaveLength(1);
  });

  test('Expects there to be at least one review posted', () => {
    let items = document.getElementsByClassName('review');
    expect(items.length).toBeGreaterThan(0);
  });

  test('Expects the summary text to be visible on screen', async () => {
    let item = await screen.getByText('This is a summary...');
    expect(item).toBeTruthy();
  });

});
