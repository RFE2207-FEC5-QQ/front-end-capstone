import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from "react-dom/client";

import Overview from "./views/Overview.jsx";
import RelatedProducts from "./views/RelatedProducts.jsx";
import QuestionsAnswers from "./views/QuestionsAnswers.jsx";
import Reviews from "./views/Reviews.jsx";

const root = createRoot(document.getElementById("root"));

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
      productId: 0
    }
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <h1>Hello World!!!</h1>
        <Overview/>
        <RelatedProducts/>
        <QuestionsAnswers/>
        <Reviews/>
      </ThemeProvider>
    );
  }
}

root.render(<App />);