import React from "react";
import PropTypes from "prop-types";
import {ratingStars} from "../../constants/offer";

export default function ReviewItem({review}) {
  const {avatar, name, stars, description, date} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatar} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingStars[Math.round(stars)]}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {description}
        </p>
        <time className="reviews__time" dateTime="">{date}</time>
      </div>
    </li>
  );
}


ReviewItem.propTypes = {
  review: PropTypes.exact({
    avatar: PropTypes.string,
    name: PropTypes.string,
    stars: PropTypes.number,
    description: PropTypes.arrayOf(PropTypes.string),
    date: PropTypes.string,
    id: PropTypes.number,
  })
};
