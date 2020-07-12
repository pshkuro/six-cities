import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import PropTypes from "prop-types";
import {Operation} from "../../redux/reviews/reviews.js";


const CorrectReviewValue = {
  COMMENT: {
    minLength: 50,
    maxLength: 300,
  },

  RATING: {
    minStars: 1,
    maxStars: 5,
  }
};


export default function withReviewForm(Component) {

  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        ratingValue: ``,
        commentValue: ``,
        isSending: false,
        isReviewInfoCorrect: false,
        isError: false,
      };

      this._baseState = this.state;

      this._handleFieldChange = this._handleFieldChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._checkReviewInfoCorrect = this._checkReviewInfoCorrect.bind(this);
      this._addNewReview = this._addNewReview.bind(this);
      this._onSuccessFormSubmit = this._onSuccessFormSubmit.bind(this);
      this._onErrorFormSubmit = this._onErrorFormSubmit.bind(this);
    }

    _checkReviewInfoCorrect() {
      const isCommentCorrectLenght =
      this.state.commentValue.length >= CorrectReviewValue.COMMENT.minLength
      && this.state.commentValue.length <= CorrectReviewValue.COMMENT.maxLength
        ? true : false;
      const isRatingCorrect =
      this.state.ratingValue >= CorrectReviewValue.RATING.minStars &&
      this.state.ratingValue <= CorrectReviewValue.RATING.maxStars ? true : false;

      return isCommentCorrectLenght && isRatingCorrect ?
        this.setState({isReviewInfoCorrect: true}) :
        this.setState({isReviewInfoCorrect: false});
    }

    _onSuccessFormSubmit() {
      this.setState(this._baseState);
    }

    _onErrorFormSubmit() {
      this.setState({
        isSending: false,
        isError: true
      });
    }

    _addNewReview() {
      const {onReviewFormSubmit, offerId} = this.props;
      this.setState({isSending: true});
      onReviewFormSubmit(
          {
            comment: this.state.commentValue,
            rating: this.state.ratingValue,
          },
          offerId,
          this._onSuccessFormSubmit,
          this._onErrorFormSubmit);

    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      this.setState({
        isError: false,
      });

      return this.state.isReviewInfoCorrect ? this._addNewReview() : null;
    }

    _handleFieldChange(evt) {
      const fieldName = evt.target.name;
      this.setState({
        [`${fieldName}Value`]: evt.target.value,
      }, () => this._checkReviewInfoCorrect());
    }

    render() {
      const {authorizationStatus} = this.props;
      return (
        <Component
          isReviewInfoCorrect={this.state.isReviewInfoCorrect}
          authorizationStatus={authorizationStatus}
          onFormSubmit={this._handleFormSubmit}
          onFieldChange={this._handleFieldChange}
          commentValue={this.state.commentValue}
          ratingValue={this.state.ratingValue}
          isSending={this.state.isSending}
          isError={this.state.isError}/>
      );
    }
  }

  WithReviewForm.propTypes = {
    authorizationStatus: PropTypes.string.isRequired,
    onReviewFormSubmit: PropTypes.func.isRequired,
    offerId: PropTypes.number.isRequired,
  };

  const mapStateToProps = (state) => ({
    authorizationStatus: getAuthorizationStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewFormSubmit(reviewData, id, onSuccess, onError) {
      dispatch(Operation.addReview(reviewData, id, onSuccess, onError));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewForm);

}


