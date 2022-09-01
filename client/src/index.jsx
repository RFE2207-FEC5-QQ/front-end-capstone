import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
<<<<<<< HEAD
=======

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
        <Navigation/>
        <Overview/>
        <RelatedProducts/>
        <QuestionsAnswers/>
        <Reviews productId={this.state.productId}/>
      </ThemeProvider>
    );
  }
}

>>>>>>> dev
root.render(<App />);