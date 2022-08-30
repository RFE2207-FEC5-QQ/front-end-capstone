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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      darkMode: false,
    };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    const rootElement = document.querySelector('body');
    rootElement.classList.toggle('dark-mode');
    this.setState({
      productId: this.state.productId,
      darkMode: !this.state.darkMode,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navigation onChange={this.toggleDarkMode}/>
        <Overview/>
        <RelatedProducts/>
        {/* Ensure proper merge due to inclusion of Outfit component created on outfit branch. */}
        <Outfit/>
        <QuestionsAnswers/>
        {/* Uncomment out Reviews once merging with main branch. */}
        {/* <Reviews/> */}
      </React.Fragment>
    );
  }
}

root.render(<App />);