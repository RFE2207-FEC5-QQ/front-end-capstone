import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';

import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';

// Sprint 1 exercise:
// This comment is here for testing out creation of dev branch and pushing to central repo.
// A pull request will be made on dev branch.

const root = createRoot(document.getElementById('root'));

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 37311 // TODO: Change to currently viewed product ID using context
    };
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        {/* <Navigation/>
        <Overview/>
        <RelatedProducts/>
        <QuestionsAnswers/> */}
        <Reviews productId={this.state.productId}/>
      </ThemeProvider>
    );
  }
}

root.render(<App />);