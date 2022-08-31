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
      darkMode: JSON.parse(window.localStorage.getItem('dark')) ?? false,
      punkMode: false,
      psychMode: false,
    };
    this.darkMode = this.darkMode.bind(this);
    this.godMode = this.godMode.bind(this);
    this.punkMode = this.punkMode.bind(this);
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
    // Remove querySelector after building out function if using.
    const rootElement = document.querySelector('body');
    rootElement.classList.toggle('god-mode');
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      customMode: !this.state.customMode,
    });
  }

  punkMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      punkMode: !this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }


  ludiMode() {
    // Remove querySelector after building out function if using.
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
      punkMode: this.state.punkMode,
      psychMode: !this.state.psychMode,
    });
  }

  componentDidMount() {
    if (this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.darkMode !== prevState.darkMode) {
      window.localStorage.setItem('dark', JSON.stringify(this.state.darkMode));
      document.body.classList.toggle('dark-mode');
    }
  }

  render() {
    const themeTogglers = {
      toggleDark: this.darkMode,
      toggleGod: this.godMode,
      togglePunk: this.punkMode,
      toggleLudi: this.ludiMode,
      togglePsych: this.psychMode,
    };

    const modes = {
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
    };

    return (
      <React.Fragment>
        <Navigation modes={modes} toggleTheme={themeTogglers}/>
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