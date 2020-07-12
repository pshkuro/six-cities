import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../constants/page.js";

const ratingStars = [5, 4, 3, 2, 1];


export default function ReviewForm({authorizationStatus, onFormSubmit, onFieldChange}) {

  if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
    return null;
  }

  return (
    <form
      className="reviews__form form"
      onSubmit={onFormSubmit}
      action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        {ratingStars.map((starNumber) => (
          <React.Fragment key={starNumber}>
            <input className="form__rating-input visually-hidden"
              onClick={(evt) => onFieldChange(evt)}
              name="rating"
              value={starNumber}
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
        placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

