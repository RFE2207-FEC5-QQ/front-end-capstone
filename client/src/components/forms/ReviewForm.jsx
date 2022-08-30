import React from 'react';
import axios from 'axios';

// TODO: Should actually refactor this and the other modal (anything with toggled visibility)
// to store their visibility within the component, that way you don't re-render the parent every time
// You show / hide the component
export default class ReviewForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: null, // 1 - 5
      recommend: false, // Recommendation will be captured via a radio button array of “Yes” and “No”.
      // Default radio button behavior will apply.
      characteristics: {},
      summary: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: Best purchase ever!”
      // Optional
      body: '', // A text input allowing up to 1000 characters.
      // Placeholder text should read: “Why did you like the product or not?”.
      // The review must be over 50 characters long in order to be submitted. If the user tries to submit a review shorter than 50 characters, then the submission should fail in the same manner as it would for a blank mandatory field.
      photos: [], // Up to 5 photos allowed
      name: '', // A text input allowing up to 60 characters for the user’s display name.
      // Placeholder text should read: “Example: jackson11!”.
      // Below this field, the text “For privacy reasons, do not use your full name or email address” will appear.
      email: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: jackson11@email.com”.
      // Below this field, the text “For authentication reasons, you will not be emailed” will appear.
    };
    this.postReview = this.postReview.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  postReview() {
    return axios.post('/reviews', {
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
        console.log('POST success!'); // DEBUG
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitForm(e) {
    e.preventDefault();
    // this.postReview();
    this.props.postSubmit();
  }

  render() {
    return (
      <form className='review-form-content' onSubmit={this.submitForm}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            value={this.state.name}
            onChange={(e) =>
              this.setState({name: e.target.value})
            }
          />
        </label>
        <label>
          Email:
          <input
            type='text'
            name='email'
            value={this.state.email}
            onChange={(e) =>
              this.setState({email: e.target.value})
            }
          />
        </label>
        <label>
          Summary:
          <input
            type='text'
            name='summary'
            value={this.state.summary}
            onChange={(e) =>
              this.setState({summary: e.target.value})
            }
          />
        </label>
        <label>
          Body:
          <input
            type='text'
            name='body'
            value={this.state.body}
            onChange={(e) =>
              this.setState({body: e.target.value})
            }
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}