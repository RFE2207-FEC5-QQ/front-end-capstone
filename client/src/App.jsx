import React from 'react';
import { createRoot } from 'react-dom/client';
import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';

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
        <Navigation modes={modes} toggleTheme={themeTogglers}/>
        <Overview/>
        <RelatedProducts modes={modes}/>
        <QuestionsAnswers/>
        {/* <Reviews productId={37311}/> */}
      </React.Fragment>
    );
  }
}

export default App;