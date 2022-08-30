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
      psychMode: false,
    };
    this.darkMode = this.darkMode.bind(this);
    this.godMode = this.godMode.bind(this);
    this.ludiMode = this.ludiMode.bind(this);
    this.psychMode = this.psychMode.bind(this);
  }

  darkMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: !this.state.darkMode,
      psychMode: this.state.psychMode,
    });
  }

  godMode() {
    const rootElement = document.querySelector('body');
    rootElement.classList.toggle('god-mode');
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      customMode: !this.state.customMode,
    });
  }

  ludiMode() {
    const rootElement = document.querySelector('body');
    rootElement.classList.toggle('ludicrous-mode');
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      customMode: !this.state.customMode,
    });
  }

  psychMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      psychMode: !this.state.psychMode,
    });
  }

  componentDidMount() {
    if (!this.state.darkMode) {
      document.body.classList.remove('dark-mode');
      return;
    }
    document.body.classList.add('dark-mode');
  }

  componentDidUpdate() {
    if (!this.state.darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  }

  render() {
    const themeTogglers = {
      toggleDark: this.darkMode,
      toggleGod: this.godMode,
      toggleLudi: this.ludiMode,
      togglePsych: this.psychMode
    };

    const modes = {
      psychMode: this.state.psychMode,
    };

    return (
      <React.Fragment>
        <Navigation className='psychedlic mode' modes={modes} toggleTheme={themeTogglers}/>
        <Overview/>
        <RelatedProducts modes={modes}/>
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