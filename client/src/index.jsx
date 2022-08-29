import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
// Ensure proper merge with new outfit component.
import Outfit from './components/views/Outfit.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';

const root = createRoot(document.getElementById('root'));

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
    divider: '#000000',
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  }
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#17202A',
    },
    background: {
      default: '#17202A',
    },
    divider: '#ffffff',
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      darkMode: false,
    };
    this.toggleColorMode = this.toggleColorMode.bind(this);
  }

  toggleColorMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: !this.state.darkMode,
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.darkMode ? darkTheme : lightTheme}>
        <CssBaseline/>
        <Navigation onChange={this.toggleColorMode}/>
        <Overview/>
        <RelatedProducts/>
        {/* Ensure proper merge due to inclusion of Outfit component created on outfit branch. */}
        <Outfit/>
        <QuestionsAnswers/>
        {/* Uncomment out Reviews once merging with main branch. */}
        {/* <Reviews/> */}
      </ThemeProvider>
    );
  }
}

root.render(<App />);