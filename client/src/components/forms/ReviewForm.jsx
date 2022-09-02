import React from 'react';
import axios from 'axios';
import { Rating } from '@mui/material';

import ReviewFormImageModal from '../modals/ReviewFormImageModal.jsx';

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
    // TODO: Ensure someone can't submit the form without all required values filled out
    this.state = {
      errorMessage: null,
      rating: null, // 1 - 5
      ratingValid: false,
      recommend: null, // Recommendation will be captured via a radio button array of “Yes” and “No”.
      // Default radio button behavior will apply.
      recommendValid: false,
      characteristics: {},
      characteristicsValid: function(metaCharacteristics) {
        let output = {};
        for (let key in metaCharacteristics) {
          output[key] = false;
        }
        return output;
      }(this.props.metaCharacteristics),
      summary: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: Best purchase ever!”
      // Optional
      summaryValid: true,
      body: '', // A text input allowing up to 1000 characters.
      // Placeholder text should read: “Why did you like the product or not?”.
      // The review must be over 50 characters long in order to be submitted. If the user tries to submit a review shorter than 50 characters, then the submission should fail in the same manner as it would for a blank mandatory field.
      bodyValid: false,
      photos: [], // Up to 5 photos allowed
      name: '', // A text input allowing up to 60 characters for the user’s display name.
      // Placeholder text should read: “Example: jackson11!”.
      // Below this field, the text “For privacy reasons, do not use your full name or email address” will appear.
      nameValid: false,
      email: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: jackson11@email.com”.
      // Below this field, the text “For authentication reasons, you will not be emailed” will appear.
      emailValid: false,
      showFormImageModal: false
    };
    this.postReview = this.postReview.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitPhotos = this.submitPhotos.bind(this);
    this.openFormImageModal = this.openFormImageModal.bind(this);
    this.closeFormImageModal = this.closeFormImageModal.bind(this);
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

  submitPhotos(photoArray) {
    this.setState({
      photos: photoArray,
      showFormImageModal: false
    });
  }

  openFormImageModal(e) {
    e.preventDefault();
    this.setState({showFormImageModal: true});
  }

  closeFormImageModal(e) {
    e.preventDefault();
    this.setState({showFormImageModal: false});
  }

  render() {
    return (
      <form className='review-form-content' onSubmit={this.submitForm}>
        <div className='review-form-rating'>
          {'Rating '}
          <Rating
            sx={{
              color: this.props.paletteMap[this.state.rating || 3][1]
            }}
            name="rating"
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
        <div className='review-form-characteristics'>
          {'Characteristics'}
          {Object.keys(this.props.metaCharacteristics).map((characteristic) => (
            <div key={characteristic.toLowerCase()} className='review-form-characteristics-entry'>
              {characteristic}
              {Object.keys(this.props.characteristicChart[characteristic]).map((key) => (
                <div key={`${characteristic.toLowerCase()}-${key}`} className='review-form-characteristics-entry-value'>
                  <label>
                    <input
                      type='radio'
                      name={`characteristic-${characteristic.toLowerCase()}-${key}`}
                      value={key}
                      checked={this.state.characteristics[this.props.metaCharacteristics[characteristic].id] === parseInt(key)}
                      onChange={(e) => {
                        let characteristics = this.state.characteristics;
                        characteristics[this.props.metaCharacteristics[characteristic].id] = parseInt(e.target.value);
                        this.setState({characteristics});
                        if (!this.state.characteristicsValid[characteristic]) {
                          let characteristicsValid = this.state.characteristicsValid;
                          characteristicsValid[characteristic] = true;
                          this.setState({characteristicsValid});
                        }
                      }}
                    />
                    {this.props.characteristicChart[characteristic][key]}
                  </label>
                </div>
              ))}
            </div>
          ))}
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
            {`Max characters left: ${(60 - this.state.summary.length).toString()}`}
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
            {this.state.bodyValid ? 'Minimum reached' : `Minimum required characters left: [${(50 - this.state.body.length).toString()}]`}
            {`Max characters left: ${(1000 - this.state.body.length).toString()}`}
          </label>
        </div>
        <div className='review-form-photos'>
          {'Photos'}
          <button onClick={this.openFormImageModal}>Add Photos</button>
          {this.state.showFormImageModal && <ReviewFormImageModal submitPhotos={this.submitPhotos} closeModal={this.closeFormImageModal}/>}
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
            {`Max characters left: ${(60 - this.state.name.length).toString()}`}
            {'For privacy reasons, do not use your full name or email address'}
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
            {`Max characters left: ${(60 - this.state.email.length).toString()}`}
            {'For authentication reasons, you will not be emailed'}
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
              this.state.emailValid &&
              function(characteristicsValid) {
                for (let characteristic in characteristicsValid) {
                  if (!characteristicsValid[characteristic]) {
                    return false;
                  }
                }
                return true;
              }(this.state.characteristicsValid)
            )
          }
        />
        <div className='review-form-error'>
          {this.state.errorMessage}
        </div>
      </form>
    );
  }

}