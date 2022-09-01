import React from 'react';
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
      <React.Fragment>
        <Navigation onChange={this.toggleColorMode}/>
        <Overview/>
        <RelatedProducts/>
        <QuestionsAnswers/>
        <Reviews/>
      </React.Fragment>
    );
  }
}

export default App;