import React from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';
// import Contact from './components/views/Contact.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 0,
      darkMode: JSON.parse(window.localStorage.getItem('dark')) || false,
      punkMode: false,
      psychMode: false,
    };
    this.darkMode = this.darkMode.bind(this);
    this.punkMode = this.punkMode.bind(this);
    this.psychMode = this.psychMode.bind(this);
    this.useRainbow = this.useRainbow.bind(this);
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

  componentDidMount() {
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

    return (
      <React.Fragment>
        {/* ADD COMPONENT(S) TO FEATURE */}
        <Overview productId={37315}/>
      </React.Fragment>
    );
  }
}

export default App;
