import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default class ReviewFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: null, // 1 - 5
      recommended: false, // Recommendation will be captured via a radio button array of “Yes” and “No”.
      // Default radio button behavior will apply.
      characteristics: {},
      summary: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: Best purchase ever!”
      // Optional
      body: '', // A text input allowing up to 1000 characters.
      // Placeholder text should read: “Why did you like the product or not?”.
      // The review must be over 50 characters long in order to be submitted. If the user tries to submit a review shorter than 50 characters, then the submission should fail in the same manner as it would for a blank mandatory field.
      photos: [], // Up to 5 photos allowed
      nickname: '', // A text input allowing up to 60 characters for the user’s display name.
      // Placeholder text should read: “Example: jackson11!”.
      // Below this field, the text “For privacy reasons, do not use your full name or email address” will appear.
      email: '', // A text input allowing up to 60 characters.
      // Placeholder text should read: “Example: jackson11@email.com”.
      // Below this field, the text “For authentication reasons, you will not be emailed” will appear.
    };
  }

  render() {
    return (
      <div className='review-form-modal'>
        <Dialog open={true} onClose={this.exitModal}>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <button onClick={this.props.closeReviewModal}>Close</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

}