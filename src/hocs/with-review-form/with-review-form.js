import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import PropTypes from "prop-types";
import {Operation} from "../../redux/reviews/reviews.js";


export default function withReviewForm(Component) {

  class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        ratingValue: ``,
        commentValue: ``,
        isSending: false,
      };

      this._baseState = this.state;

      this._handleFieldChange = this._handleFieldChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormSubmit(evt) {
      const {onReviewFormSubmit, offerId} = this.props;

      evt.preventDefault();

      onReviewFormSubmit({
        comment: this.state.commentValue,
        rating: this.state.ratingValue,
      }, offerId);

      this.setState(this._baseState);

    }

    _handleFieldChange(evt) {
      const fieldName = evt.target.name;
      this.setState({
        [`${fieldName}Value`]: evt.target.value,
      });
    }

    render() {
      const {authorizationStatus} = this.props;

      return (
        <Component
          authorizationStatus={authorizationStatus}
          onFormSubmit={this._handleFormSubmit}
          onFieldChange={this._handleFieldChange}/>
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
    onReviewFormSubmit(reviewData, id) {
      dispatch(Operation.addReview(reviewData, id));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewForm);

}


