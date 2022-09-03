import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
import Outfit from './components/views/Outfit.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      productDetail: null,
      darkMode: JSON.parse(window.localStorage.getItem('dark')) ?? false,
      punkMode: false,
      psychMode: false,
    };
    this.darkMode = this.darkMode.bind(this);
    this.punkMode = this.punkMode.bind(this);
    this.psychMode = this.psychMode.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(item) {
    this.setState({
      productId: item,
      productDetail: this.state.products,
      darkMode: this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
    })
  }

  darkMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.products,
      darkMode: !this.state.darkMode,
      punkMode: !this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }

  punkMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.products,
      darkMode: this.state.darkMode,
      punkMode: !this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }

  psychMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.products,
      darkMode: this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: !this.state.psychMode,
    });
  }

  componentDidMount() {
    // Same as overview getProducts axios request. Pass down as props if warranted.
    // Upon mount, API call to get back all products. By default state will be set
    // as first product in the list (allProducts[0]).
    // Change array index to change product.
      const options = {
        method: 'get',
        url: '/details',
      }
      axios(options)
        .then(res => {
          const allProducts = res.data;
          this.setState({
            productId: allProducts[0].id,
            productDetail: allProducts[0],
            darkMode: this.state.darkMode,
            punkMode: this.state.punkMode,
            psychMode: this.state.psychMode,
          })
        })
        .catch(err => {
          console.log('error getting products', err)
        })

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

    // ProductId will change when related product card is clicked.
    // When productId changes, product state will change to include product info.
    if (this.state.productId !== prevState.productId) {
      const options = {
        method: 'get',
        url: '/info',
        params: { id: this.state.productId },
      }
      axios(options)
        .then(res => {
          const currentProduct = res.data;
          // console.log('current product', currentProduct)
          this.setState({
            productId: this.state.productId,
            productDetail: currentProduct,
            darkMode: this.state.darkMode,
            punkMode: this.state.punkMode,
            psychMode: this.state.psychMode,
          })
        })
        .catch(err => {
          console.log('error getting updated product', err)
        })
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
        <RelatedProducts
          onClick={this.changeProduct}
          productId={this.state.productId}
          product={this.state.productDetail}
          modes={modes}/>
        <Outfit
          productId={this.state.productId}
          product={this.state.productDetail}
        />
        <QuestionsAnswers/>
        <Reviews productId={this.state.productId}/>
      </React.Fragment>
    );
  }
}

export default App;