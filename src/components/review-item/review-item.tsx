import * as React from "react";
import {ratingStars} from "../../constants/offer";
import {Review} from "../../types/types";
import {convertDateToMonthDayFormat} from "../../utils/common";

interface Props {
  review: Review;
}

export default function ReviewItem({review}: Props): JSX.Element {
  const {comment, date, rating, user} = review;
  const {avatar, isPro, name} = user;
  const reviewDate = convertDateToMonthDayFormat(new Date(date));
  const isReviwerPro = isPro ? `property__avatar-wrapper property__avatar-wrapper--pro` : ``;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className={`reviews__avatar-wrapper user__avatar-wrapper ${isReviwerPro}`}>
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingStars[Math.round(rating)]}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime="">{reviewDate}</time>
      </div>
    </li>
  );
}


