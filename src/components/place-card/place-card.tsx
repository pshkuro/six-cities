import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {ActionCreator} from "../../redux/page/page";
import {AppRoute} from "../../routing/routes";
import {AuthorizationStatus} from "../../constants/page";
import {getAuthorizationStatus} from "../../redux/user/selectors";
import {Operation} from "../../redux/offers-favorites/offers-favorites";
import {Offer, AuthorizationStatus as AuthorizationStatusType, Classes} from "../../types/types";
import {RatingStars} from "../../constants/offer";

interface Props {
  offer: Offer;
  classes: Classes;
  onAdvertCardMouseOver: (offer: Offer) => void;
  onAdvertCardMouseOut: () => void;
  authorizationStatus: AuthorizationStatusType;
  setFavorite: (id: number, isOfferFavorite: number) => void;
}

export function PlaceCard({
  offer,
  classes,
  onAdvertCardMouseOver,
  onAdvertCardMouseOut,
  authorizationStatus,
  setFavorite,
}: Props): JSX.Element {
  const {previewImage, premium, favourite, cost, title, type, rating, id} = offer;

  const isOfferFavorite = Number(!favourite);
  const handleOnAdvertCardMouse = () => onAdvertCardMouseOver(offer);
  const handleSetFavoriteClick = () => {
    setFavorite(id, isOfferFavorite);
  };
  const handleRemoveFavoriteClick = () => {
    setFavorite(id, 0);
  };

  const isFavorite = classes.wrapper === `favorites`;
  const imageWidth = isFavorite ? 150 : 260;
  const imageHeight = isFavorite ? 200 : 110;

  return (
    <article className={`${classes.card}card place-card`}
      onMouseEnter={onAdvertCardMouseOver && handleOnAdvertCardMouse}
      onMouseLeave={onAdvertCardMouseOut}>
      {premium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${classes.wrapper ? `${classes.wrapper}__image-wrapper` : ``} place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place image" />
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
                onClick={favourite ? handleRemoveFavoriteClick : handleSetFavoriteClick}
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
            <span style={{width: `${RatingStars[Math.round(rating)]}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link
          to={`/offer/${offer.id}`}>
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onAdvertCardMouseOver(offer) {
    dispatch(ActionCreator.makeOfferCardActive(offer));
  },

  onAdvertCardMouseOut() {
    dispatch(ActionCreator.makeOfferInactive());
  },

  setFavorite(id, status) {
    dispatch(Operation.setFavorite(id, status));
  },

});


export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);

