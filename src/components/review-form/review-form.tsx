import * as React from "react";
import {AuthorizationStatus} from "../../constants/page";
import {AuthorizationStatus as AuthorizationStatusType} from "../../types/types";
import {shake} from "../../utils/form";

interface Props {
  authorizationStatus: AuthorizationStatusType;
  onFormSubmit: () => void;
  onFieldChange: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentValue: string;
  ratingValue: string;
  isReviewInfoCorrect: boolean;
  isSending: boolean;
  isError: boolean;
}

const RATING_STARS = [5, 4, 3, 2, 1];

export default class ReviewForm extends React.PureComponent<Props, {}> {
  private formRef: React.RefObject<HTMLFormElement>;

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
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

    const isSubmitButtonDisabled = !isReviewInfoCorrect || isSending;
    const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => onFieldChange(evt);

    if (isError) {
      shake(this.formRef.current);
    }

    return (
      <form
        className="reviews__form form"
        ref={this.formRef}
        onSubmit={onFormSubmit}
        action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">

          {RATING_STARS.map((starNumber) => (
            <React.Fragment key={starNumber}>
              <input className="form__rating-input visually-hidden"
                onChange={handleFieldChange}
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
          onChange={handleFieldChange}
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
            disabled={isSubmitButtonDisabled}>Submit</button>
        </div>
      </form>
    );
  }
}


