import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../constants/page.js";
import {shake} from "../../utils/form.js";
import {PureComponent} from "react";
import {createRef} from "react";

const ratingStars = [5, 4, 3, 2, 1];


export default class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this._formRef = createRef();
  }

  render() {
    const {authorizationStatus,
      onFormSubmit,
      onFieldChange,
      commentValue,
      ratingValue,
      isReviewInfoCorrect,
      isSending,
      isError} = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return null;
    }

    const isSubmtButtonDisabled = !isReviewInfoCorrect || isSending ? true : false;

    if (isError) {
      shake(this._formRef.current);
    }

    return (
      <form
        className="reviews__form form"
        ref={this._formRef}
        onSubmit={onFormSubmit}
        action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">

          {ratingStars.map((starNumber) => (
            <React.Fragment key={starNumber}>
              <input className="form__rating-input visually-hidden"
                onChange={(evt) => onFieldChange(evt)}
                disabled={isSending}
                name="rating"
                value={starNumber}
                checked={starNumber === Number(ratingValue)}
                id={`${starNumber}-stars`} type="radio"/>
              <label htmlFor={`${starNumber}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          ))}

        </div>
        <textarea
          className="reviews__textarea form__textarea"
          onChange={(evt) => onFieldChange(evt)}
          id="review"
          name="comment"
          value={commentValue}
          disabled={isSending}
          placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isSubmtButtonDisabled}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  commentValue: PropTypes.string.isRequired,
  ratingValue: PropTypes.string.isRequired,
  isReviewInfoCorrect: PropTypes.bool.isRequired,
  isSending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

