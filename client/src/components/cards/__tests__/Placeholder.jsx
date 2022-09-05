
it('Should not render card if no product info or styles are fetched', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue({data: null});

  render(<RelatedCard onClick={clickHandler} modal='related'/>);
  expect(screen.getByLabelText('progress-icon')).toBeInTheDocument();

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  await waitFor(() => expect(screen.queryByText('Yong')).not.toBeInTheDocument());
});

it('Should render card if product info, styles, and ratings are all fetched', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue({
    data: {
      name: 'Yong',
      default_price: 500,
      results: [{photos:
        [{
          thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        }]
      }],
      ratings: {5: 1},
    }
  });

  screen.debug();
  render(<RelatedCard item='37311' onClick={clickHandler} modal='related'/>);
  screen.debug();
  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  await waitFor(() => expect(screen.queryByText('Yong')).toBeInTheDocument());
  const Yong = await waitFor(() => screen.queryByText('Yong').toBeInTheDocument());
  expect(Yong).toBeInTheDocument();
});

  // it('Should call click handler once on icon if related card is an outfit item', async () => {
  //   jest.spyOn(axios, 'get').mockResolvedValue({
  //     data: {
  //       name: 'Yong',
  //       default_price: 500,
  //       results: [{photos:
  //         [{
  //           thumbnail_url: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  //         }]
  //       }],
  //       ratings: {5: 1},
  //     }
  //   });

    // render(<RelatedCard item='37311' onClick={clickHandler} modal='related'/>);

    // await waitFor(() => expect(screen.queryByText('Yong')).toBeInTheDocument());
    // return user.click(screen.getByAltText('Yong'))
    //   .then(() => {
    //     expect(clickHandler.mock.calls.length).toBe(1);
    //     expect(clickHandler.mock.calls.length).not.toBe(2);
    //   });
    // });
  // });




// describe('Testing click functionality', () => {

//   it('Should call click handler once on icon if related card is an outfit item', () => {
//     user.click(screen.getByLabelText('close-outfit-card'))
//       .then(() => {
//         expect(clickHandler.mock.calls.length).toBe(1);
//       });
//   });
// });