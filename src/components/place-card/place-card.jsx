import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/page/page.js";
import {ratingStars} from "../../constants/offer";


export function PlaceCard({offer, onAdvertCardTitleClick, classes, onAdvertCardMouseOver, onAdvertCardMouseOut}) {
  const {previewImage, premium, favourite, cost, title, type, rating} = offer;

  const handleOnAdvertCardTitle = () => onAdvertCardTitleClick(offer);
  const handleOnAdvertCardMouse = () => onAdvertCardMouseOver(offer);

  return (
    <article className={`${classes.card}card place-card`}
      onMouseEnter={onAdvertCardMouseOver && handleOnAdvertCardMouse}
      onMouseLeave={onAdvertCardMouseOut}>
      {premium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className={`${classes.wrapper}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${favourite && `place-card__bookmark-button--active`}`}
            type="button">
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
          onClick={onAdvertCardTitleClick && handleOnAdvertCardTitle}>
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


PlaceCard.propTypes = {
  offer: PropTypes.exact({
    pictures: PropTypes.arrayOf(PropTypes.string),
    previewImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    premium: PropTypes.bool,
    favourite: PropTypes.bool,
    type: PropTypes.string,
    rating: PropTypes.number,
    bedrooms: PropTypes.number,
    guests: PropTypes.number,
    cost: PropTypes.number,
    conveniences: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.arrayOf(PropTypes.number),
    owner: PropTypes.exact({
      avatar: PropTypes.string,
      name: PropTypes.string,
      pro: PropTypes.bool,
      id: PropTypes.number,
    }).isRequired,
    id: PropTypes.number,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  onAdvertCardTitleClick: PropTypes.func,
  onAdvertCardMouseOver: PropTypes.func,
  onAdvertCardMouseOut: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onAdvertCardMouseOver(offer) {
    dispatch(ActionCreator.makeOfferCardActive(offer));
  },

  onAdvertCardMouseOut() {
    dispatch(ActionCreator.makeOfferInactive());
  },
});

export default connect(null, mapDispatchToProps)(PlaceCard);

