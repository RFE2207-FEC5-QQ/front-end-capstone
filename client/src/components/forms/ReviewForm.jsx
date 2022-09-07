import React from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';

import ReviewFormImageModal from '../modals/ReviewFormImageModal.jsx';
import ReviewImageList from '../lists/ReviewImageList.jsx';
import ReviewFormCharacteristic from '../cards/ReviewFormCharacteristic.jsx';


// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
export default class ReviewForm extends React.Component {

  // props.postSubmit - Action taken after submitting form
  // props.metaCharacteristics - Characteristics for currently selected product
  // props.characteristicChart - Mapping of characteristic types to their value descriptions
  // props.productId - Currently selected product
  // props.paletteMap - Colors for the star ratings
  // props.setErrorMessage - Sets an error message to display in parent component
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      rating: null,
      ratingValid: false,
      recommend: null,
      recommendValid: false,
      characteristics: function(mc) {
        let output = {};
        for (let key in mc) {
          output[mc[key].id] = 3;
        }
        return output;
      }(this.props.metaCharacteristics),
      summary: '',
      summaryValid: true,
      body: '',
      bodyValid: false,
      photos: [],
      name: '',
      nameValid: false,
      email: '',
      emailValid: false,
      showFormImageModal: false
    };
    this.postReview = this.postReview.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.openFormImageModal = this.openFormImageModal.bind(this);
    this.closeFormImageModal = this.closeFormImageModal.bind(this);
    this.onCharValueChange = this.onCharValueChange.bind(this);
  }

  postReview() {
    axios.post('/reviews', {
      productId: this.props.productId,
      rating: this.state.rating,
      summary: this.state.summary,
      body: this.state.body,
      recommend: this.state.recommend,
      name: this.state.name,
      email: this.state.email,
      photos: this.state.photos,
      characteristics: this.state.characteristics
    })
      .then((success) => {
        this.props.postSubmit();
      })
      .catch((error) => {
        console.log(error);
        this.setState({errorMessage: `There was an error submitting the form: ${error.message}`});
      });
  }

  submitForm(e) {
    e.preventDefault();
    this.postReview();
  }

  submitPhoto(photoUrl) {
    let photos = this.state.photos.slice();
    photos.push(photoUrl);
    this.setState({photos});
  }

  openFormImageModal(e) {
    e.preventDefault();
    this.setState({showFormImageModal: true});
  }

  closeFormImageModal(e) {
    e.preventDefault();
    this.setState({showFormImageModal: false});
  }

  onCharValueChange(characteristic, value) {
    let characteristics = this.state.characteristics;
    characteristics[this.props.metaCharacteristics[characteristic].id] = parseInt(value);
    this.setState({characteristics});
  }

  render() {
    return (
      <form className='review-form-content' onSubmit={this.submitForm}>
        <h2>Leave a Review</h2>
        <div className='review-form-rating'>
          {'Rating '}
          <Rating
            sx={{
              color: this.props.paletteMap[this.state.rating || 3]
            }}
            name="rating"
            size='large'
            value={this.state.rating}
            onChange={(e) =>
              this.setState({rating: parseInt(e.target.value)}, () => {
                if (!this.state.ratingValid) {
                  this.setState({ratingValid: true});
                }
              })
            }
          />
        </div>
        <div className='review-form-recommend'>
          {'Do you recommend this product?'}
          <div>
            <label>
              <input
                type='radio'
                name='recommend-true'
                value='true'
                checked={this.state.recommend === true}
                onChange={(e) =>
                  this.setState({recommend: true}, () => {
                    if (!this.state.recommendValid) {
                      this.setState({recommendValid: true});
                    }
                  })
                }
              />
              Yes
            </label>
            <label>
              <input
                type='radio'
                name='recommend-false'
                value='false'
                checked={this.state.recommend === false}
                onChange={(e) =>
                  this.setState({recommend: false}, () => {
                    if (!this.state.recommendValid) {
                      this.setState({recommendValid: true});
                    }
                  })
                }
              />
              No
            </label>
          </div>
        </div>
        <div className='review-form-characteristics'>
          {Object.keys(this.props.metaCharacteristics).map((characteristic) =>
            <ReviewFormCharacteristic
              key={characteristic.toLowerCase()}
              metaCharacteristics={this.props.metaCharacteristics}
              characteristic={characteristic}
              characteristics={this.state.characteristics}
              characteristicChart={this.props.characteristicChart}
              onCharValueChange={this.onCharValueChange}
            />
          )}
        </div>
        <div className='review-form-summary'>
          <label>
            {'Summary (optional) '}
            <input
              type='text'
              name='summary'
              placeholder='Example: Best purchase ever!'
              value={this.state.summary}
              onChange={(e) =>
                this.setState({summary: e.target.value}, () => {
                  let isValid = this.state.summary.length <= 60;
                  this.setState({summaryValid: isValid});
                })
              }
            />
            <small>{`Max characters left: ${(60 - this.state.summary.length).toString()}`}</small>
          </label>
        </div>
        <div className='review-form-body'>
          <label>
            {'Body '}
            <textarea
              name='body'
              placeholder='Why did you like the product or not?'
              value={this.state.body}
              onChange={(e) =>
                this.setState({body: e.target.value}, () => {
                  let isValid = 50 <= this.state.body.length && this.state.body.length <= 1000;
                  this.setState({bodyValid: isValid});
                })
              }
            />
            <small>{this.state.bodyValid ? 'Minimum reached' : `Minimum required characters left: [${(50 - this.state.body.length).toString()}]`}</small>
            <small>{`Max characters left: ${(1000 - this.state.body.length).toString()}`}</small>
          </label>
        </div>
        <div className='review-form-photos'>
          {'Photos '}
          <button onClick={this.openFormImageModal}>Add Photos</button>
          {this.state.photos.length > 0 && <ReviewImageList photoUrls={this.state.photos}/>}
          {this.state.showFormImageModal && <ReviewFormImageModal photos={this.state.photos} submitPhoto={this.submitPhoto} closeModal={this.closeFormImageModal}/>}
        </div>
        <div className='review-form-name'>
          <label>
            {'Name '}
            <input
              type='text'
              name='name'
              placeholder='Example: jackson11!'
              value={this.state.name}
              onChange={(e) =>
                this.setState({name: e.target.value}, () => {
                  let isValid = 0 < this.state.name.length && this.state.name.length <= 60;
                  this.setState({nameValid: isValid});
                })
              }
            />
            <small>{`Max characters left: ${(60 - this.state.name.length).toString()}`}</small>
            <small>{'For privacy reasons, do not use your full name or email address'}</small>
          </label>
        </div>
        <div className='review-form-email'>
          <label>
            {'Email '}
            <input
              type='text'
              name='email'
              placeholder='Example: jackson11@email.com'
              value={this.state.email}
              onChange={(e) =>
                this.setState({email: e.target.value}, () => {
                  let isValid = 0 < this.state.email.length && this.state.email.length <= 60;
                  this.setState({emailValid: isValid});
                })
              }
            />
            <small>{`Max characters left: ${(60 - this.state.email.length).toString()}`}</small>
            <small>{'For authentication reasons, you will not be emailed'}</small>
          </label>
        </div>
        <input
          type='submit'
          value='Submit'
          disabled={
            !(this.state.ratingValid &&
              this.state.recommendValid &&
              this.state.summaryValid &&
              this.state.bodyValid &&
              this.state.nameValid &&
              this.state.emailValid)
          }
        />
        <div id='review-form-error'>
          {this.state.errorMessage}
        </div>
      </form>
    );
  }

}