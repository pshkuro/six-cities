import React from "react";
import PropTypes from "prop-types";
import {ratingStars} from "../../constants/offer";
import {convertDateToMonthDayFormat} from "../../utils/common.js";

export default function ReviewItem({review}) {
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


ReviewItem.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number,
    id: PropTypes.number,
    user: PropTypes.shape(
        {
          avatar: PropTypes.string,
          name: PropTypes.string,
          isPro: PropTypes.bool,
          userId: PropTypes.number,
        }
    ),
  }).isRequired,
};
