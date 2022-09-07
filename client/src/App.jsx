import React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

import Reviews from './components/views/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      darkMode: JSON.parse(window.localStorage.getItem('dark')) || false,
      punkMode: false,
      psychMode: false,
      reviewMeta: null
    };
    this.darkMode = this.darkMode.bind(this);
    this.punkMode = this.punkMode.bind(this);
    this.psychMode = this.psychMode.bind(this);
    this.useRainbow = this.useRainbow.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
  }

  darkMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: !this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
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

  psychMode() {
    this.setState({
      productId: this.state.productId,
      darkMode: this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: !this.state.psychMode,
    });
  }


  useRainbow() {
    const viewportHeight = window.innerHeight;
    const contentHeight = document.body.getBoundingClientRect().height;
    const viewportsPerRotation = Math.min(3, contentHeight / viewportHeight);
    const from = 51;
    const progress = window.scrollY / (viewportHeight * viewportsPerRotation);
    const h = (from + 360 * progress) % 360;
    document.body.style.backgroundColor = `hsl(${h}deg, 100%, 50%)`;
  }

  getReviewMeta() {
    axios.get('/reviews/meta', {
      params: {
        productId: this.state.productId
      }
    })
      .then((success) => {
        this.setState({reviewMeta: success.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getReviewMeta();
    // Set theme on page load
    if (this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Enable psychedelic background scrolling
    let lastScroll = 0;
    const navBar = document.querySelector('.nav-bar');
    const navPlaceHolder = document.querySelector('.bg-color-placeholder');

    window.addEventListener('scroll', () => {
      let currentScroll = window.scrollY;
      if (currentScroll - lastScroll > 0) {
        navBar.classList.add('scrolled-down');
        navPlaceHolder.classList.add('scrolled-down');
        navBar.classList.remove('scrolled-up');
        navPlaceHolder.classList.remove('scrolled-up');
      } else {
        navBar.classList.add('scrolled-up');
        navPlaceHolder.classList.add('scrolled-down');
        navBar.classList.remove('scrolled-down');
        navPlaceHolder.classList.remove('scrolled-up');
      }
      lastScroll = currentScroll;
    });

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.productId !== prevState.productId) {
      this.getReviewMeta();
    }
    if (this.state.darkMode !== prevState.darkMode) {
      window.localStorage.setItem('dark', JSON.stringify(this.state.darkMode));
      document.body.classList.toggle('dark-mode');
    }
    if (this.state.psychMode !== prevState.psychMode) {
      if (this.state.psychMode) {
        window.addEventListener('scroll', this.useRainbow, { passive: true });
      } else {
        window.removeEventListener('scroll', this.useRainbow);
        document.body.style.backgroundColor = '';
      }
    }
  }

  render() {
    const themeTogglers = {
      toggleDark: this.darkMode,
      togglePunk: this.punkMode,
      togglePsych: this.psychMode,
    };

    const modes = {
      darkMode: this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
    };

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      }
    });

    return (
      <React.Fragment>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Reviews productId={this.state.productId} reviewMeta={this.state.reviewMeta}/>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
