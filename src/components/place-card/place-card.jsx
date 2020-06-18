import PropTypes from "prop-types";
import React from "react";
import {OfferInfo} from "../../constants/offer";

const ratingStars = {
  '0': 0,
  '1': 20,
  '2': 40,
  '3': 60,
  '4': 80,
  '5': 100
};

export default function PlaceCard({offer, onAdvertCardTitleClick, onAdvertCardMouseOver}) {
  const {picture, premium, cost, description, type, rating} = offer;

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => onAdvertCardMouseOver(offer)}>
      {premium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={picture} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingStars[Math.round(rating)]}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
          onClick={onAdvertCardTitleClick}>
          <a href="#">{description}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


PlaceCard.propTypes = {
  offer: PropTypes.exact({
    picture: PropTypes.string,
    premium: PropTypes.bool,
    cost: PropTypes.number,
    description: PropTypes.string,
    type: PropTypes.oneOf(OfferInfo.TYPE),
    rating: PropTypes.number,
    id: PropTypes.number,

  }).isRequired,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
  onAdvertCardMouseOver: PropTypes.func.isRequired,
};

