import React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Navigation from './components/views/Navigation.jsx';
import Overview from './components/views/Overview.jsx';
import RelatedProducts from './components/views/RelatedProducts.jsx';
import Outfit from './components/views/Outfit.jsx';
import QuestionsAnswers from './components/views/QuestionsAnswers.jsx';
import Reviews from './components/views/Reviews.jsx';
import Contact from './components/views/Contact.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 37311,
      darkMode: JSON.parse(window.localStorage.getItem('dark')) || false,
      punkMode: false,
      psychMode: false,
    };
    this.darkMode = this.darkMode.bind(this);
    this.punkMode = this.punkMode.bind(this);
    this.psychMode = this.psychMode.bind(this);
    this.useRainbow = this.useRainbow.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(item) {
    this.setState({
      productId: item,
      productDetail: this.state.productDetail,
      darkMode: this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }

  darkMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.productDetail,
      darkMode: !this.state.darkMode,
      punkMode: this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }

  punkMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.productDetail,
      darkMode: this.state.darkMode,
      punkMode: !this.state.punkMode,
      psychMode: this.state.psychMode,
    });
  }

  psychMode() {
    this.setState({
      productId: this.state.productId,
      productDetail: this.state.productDetail,
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
  };

  componentDidMount() {
    // Set theme on page load
    if (this.state.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    // Same as overview getProducts axios request. Pass down as props if warranted.
    // Upon mount, API call to get back all products. By default state will be set
    // as first product in the list (allProducts[0]).
    // Change array index to change product.
    const options = {
      method: 'get',
      url: '/details',
    };
    axios(options)
      .then(res => {
        const allProducts = res.data;
        this.setState({
          productId: allProducts[0].id,
          productDetail: allProducts[0],
          darkMode: this.state.darkMode,
          punkMode: this.state.punkMode,
          psychMode: this.state.psychMode,
        });
      })
      .catch(err => {
        console.log('error getting products', err);
      });


    // Enable psychedelic background scrolling
    let lastScroll = 0;
    const navBar = document.querySelector('.nav-bar');
    const navPlaceHolder = document.querySelector('.bg-color-placeholder');

    window.addEventListener("scroll", () => {
      let currentScroll = window.scrollY;
      if (currentScroll - lastScroll > 0) {
        navBar.classList.add("scrolled-down");
        navPlaceHolder.classList.add("scrolled-down");
        navBar.classList.remove("scrolled-up");
        navPlaceHolder.classList.remove("scrolled-up");
      } else {
        navBar.classList.add("scrolled-up");
        navPlaceHolder.classList.add("scrolled-down");
        navBar.classList.remove("scrolled-down");
        navPlaceHolder.classList.remove("scrolled-up");
      }
      lastScroll = currentScroll;
    })

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

    // ProductId will change when related product card is clicked.
    // When productId changes, product state will change to include product info.
    if (this.state.productId !== prevState.productId) {
      const options = {
        method: 'get',
        url: '/info',
        params: { id: this.state.productId },
      };
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
          });
        })
        .catch(err => {
          console.log('error getting updated product', err);
        });
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
        <Overview productId={this.state.productId}/>
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
        <Reviews productId={37311}/>
        <Contact/>
      </React.Fragment>
    );
  }
}

export default App;
