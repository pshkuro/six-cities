import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ActionCreator} from "../../redux/page/page";
import {ActionCreator as DataOffersActionCreator} from "../../redux/offers-data/offers-data";
import {ActionCreator as FavoriteCreator} from "../../redux/offers-favorites/offers-favorites";
import {AppRoute} from "../../routing/routes";
import {AuthorizationStatus} from "../../constants/page";
import {getAuthorizationStatus} from "../../redux/user/selectors";
import {Operation} from "../../redux/offers-favorites/offers-favorites";
import {Offer, AuthorizationStatus as AuthorizationStatusType, Classes} from "../../types/types";
import {ratingStars} from "../../constants/offer";


interface Props {
  offer: Offer;
  classes: Classes;
  onAdvertCardMouseOver: (offer: Offer) => void;
  onAdvertCardMouseOut: () => void;
  authorizationStatus: AuthorizationStatusType;
  setFavorite: (id: number, isOfferFavorite: number, offer: Offer) => void;
  removeFromFavorite: (id: number) => void;
}

export function PlaceCard({
  offer,
  classes,
  onAdvertCardMouseOver,
  onAdvertCardMouseOut,
  authorizationStatus,
  setFavorite,
  removeFromFavorite
}: Props): JSX.Element {
  const {previewImage, premium, favourite, cost, title, type, rating, id} = offer;

  const isOfferFavorite = favourite ? 0 : 1;
  const handleOnAdvertCardMouse = () => onAdvertCardMouseOver(offer);
  const handleSetFavoriteClick = () => {
    setFavorite(id, isOfferFavorite, offer);
  };
  const handleRemoveFavoriteClick = () => {
    removeFromFavorite(id);
    setFavorite(id, 0, offer);
  };

  const isFavorite = classes.wrapper === `favorites`;
  const imageWidth = isFavorite ? 150 : 260;
  const imaheHeight = isFavorite ? 200 : 110;

  return (
    <article className={`${classes.card}card place-card`}
      onMouseEnter={onAdvertCardMouseOver && handleOnAdvertCardMouse}
      onMouseLeave={onAdvertCardMouseOut}>
      {premium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``}
      <div className={`${classes.wrapper ? `${classes.wrapper}__image-wrapper` : ``} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imaheHeight} alt="Place image" />
        </a>
      </div>
      <div className={`${classes.info ? `${classes.info}__card-info` : ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{cost}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          {
            authorizationStatus === AuthorizationStatus.NO_AUTH
              ? <Link
                to={AppRoute.SIGN_IN}
                className={`place-card__bookmark-button button ${favourite && `place-card__bookmark-button--active`}`}
                type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </Link>
              : <button
                onClick={isFavorite ? handleRemoveFavoriteClick : handleSetFavoriteClick}
                className={`place-card__bookmark-button button ${favourite && `place-card__bookmark-button--active`}`}
                type="button">
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
          }
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingStars[Math.round(rating)]}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link
          to={`offer/${offer.id}`}>
          <h2
            className="place-card__name"
          >
            {title}
          </h2>
        </Link>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}


export const mapDispatchToProps = (dispatch) => ({
  onAdvertCardMouseOver(offer) {
    dispatch(ActionCreator.makeOfferCardActive(offer));
  },

  onAdvertCardMouseOut() {
    dispatch(ActionCreator.makeOfferInactive());
  },

  setFavorite(id, status, offer) {
    dispatch(DataOffersActionCreator.setFavoriteOffer(offer));
    dispatch(Operation.setFavorite(id, status));
  },

  removeFromFavorite(id) {
    dispatch(FavoriteCreator.removeFromFavorite(id));
  }
});

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);

