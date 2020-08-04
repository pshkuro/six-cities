import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../routing/routes";
import {AuthorizationStatus} from "../../constants/page";
import {CardClasses} from "../../constants/page";
import {getAuthorizationStatus} from "../../redux/user/selectors";
import {getPropertyOffer, getNearOffers} from "../../redux/offers-data/selectors";
import {getReviews} from "../../redux/reviews/selectors";
import Map from "../map/map";
import {Operation as OfferOperation} from "../../redux/offers-data/offers-data";
import {Operation as ReviewsOperation} from "../../redux/reviews/reviews";
import {Operation as FavoriteOperation} from "../../redux/offers-favorites/offers-favorites";
import {Offer, CityOffers, Review, AuthorizationStatus as AuthorizationStatusType} from "../../types/types";
import PlaceList from "../places-list/place-list";
import {RatingStars} from "../../constants/offer";
import ReviewsList from "../reviews-list/reviews-list";

interface Props {
  offer: Offer;
  nearOffers: Array<CityOffers>;
  reviews: Array<Review>;
  match: {
    params: {
      id: string;
    };
  };
  getPropertyOfferInfo: (id: number) => void;
  getPropertyNearOffers: (id: number) => void;
  setPropertyFavorite: (id: number, status: number) => void;
  authorizationStatus: AuthorizationStatusType;
}


export class PlaceProperty extends React.PureComponent<Props, {}> {
  componentDidMount() {
    this._getOfferInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.offer.id !== prevProps.offer.id) {
      this._getOfferInfo();
    }
  }

  private _getOfferInfo() {
    const {getPropertyOfferInfo, getPropertyNearOffers, match} = this.props;
    const {params} = match;
    const {id: offerId} = params;

    getPropertyOfferInfo(Number(offerId));
    getPropertyNearOffers(Number(offerId));
  }

  render() {
    const {offer,
      nearOffers,
      reviews,
      setPropertyFavorite,
      authorizationStatus
    } = this.props;

    if (!offer || !nearOffers) {
      return null;
    }

    const {pictures, title, description, premium, type, rating, bedrooms, guests, cost, conveniences, owner, id, favourite} = offer;
    const {avatar, name, pro} = owner;

    const {cityCoordinates, offers: nearPropertyOffers} = nearOffers[0];
    const {coordinates, zoom} = cityCoordinates;

    const isOwnerPro = pro ? `property__avatar-wrapper property__avatar-wrapper--pro` : ``;
    const pins = nearPropertyOffers.map((nearOffer: Offer) => ({
      coordinates: nearOffer.coordinates,
      isActive: false,
    }));
    const activePin = {
      coordinates: offer.coordinates,
      isActive: true,
    };

    const nearOffersCity = {
      coordinates,
      zoom,
    };

    const isOfferFavorite = Number(!favourite);
    const handlePropertyButtonClick = () => {
      setPropertyFavorite(id, isOfferFavorite);
    };

    const handleRemoveFavoritePropertyButtonClick = () => {
      setPropertyFavorite(id, 0);
    };

    return (
      <main className="page__main page__main--property" id={String(id)}>
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {pictures.map((picture: string) => {
                return (
                  <div className="property__image-wrapper" key={picture}>
                    <img className="property__image" src={picture} alt="Photo studio"/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {premium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div> : ``}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                {
                  authorizationStatus === AuthorizationStatus.NO_AUTH ?
                    <Link
                      to={AppRoute.SIGN_IN}
                      className={`property__bookmark-button button ${favourite ? `property__bookmark-button--active` : ``}`}
                      type="button">
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </Link>
                    :
                    <button
                      className={`property__bookmark-button button ${favourite ? `property__bookmark-button--active` : ``}`}
                      type="button"
                      onClick={favourite ? handleRemoveFavoritePropertyButtonClick : handlePropertyButtonClick}
                    >
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                }

              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${RatingStars[Math.round(rating)]}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms > 1 ? `${bedrooms} Bedrooms` : `1 Bedroom`}
                </li>
                <li className="property__feature property__feature--adults">
                    Max {guests} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{cost}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>

                <ul className="property__inside-list">
                  {conveniences.map((convenience: string) => {
                    return (
                      <li className="property__inside-item" key={Math.random()}>
                        {convenience}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`user__avatar-wrapper  ${isOwnerPro}`}>
                    <img className="property__avatar user__avatar" src={`/${avatar}`} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                </div>
                <div className="property__description">
                  {description.map((paragraph: string) => {
                    return (
                      <p className="property__text" key={Math.random()}>
                        {paragraph}
                      </p>
                    );
                  })}

                </div>
              </div>

              {<ReviewsList
                reviews={reviews}
                offerId={id}/>}

            </div>
          </div>

          {<Map
            pins={pins.concat(activePin)}
            cityCoordinates={nearOffersCity}
            classes={CardClasses.PROPERTY}/>}

        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>


            {<PlaceList
              offers={nearPropertyOffers}
              classes={CardClasses.PROPERTY}/>}
          </section>
        </div>
      </main>
    );
  }
}


const mapStateToProps = (state, props) => ({
  offer: getPropertyOffer(state, props.match.params.id),
  reviews: getReviews(state),
  nearOffers: getNearOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPropertyOfferInfo(offerId) {
    dispatch(ReviewsOperation.getReviews(offerId));
  },

  getPropertyNearOffers(id) {
    dispatch(OfferOperation.getNearOffers(id));
  },

  setPropertyFavorite(id, status) {
    dispatch(FavoriteOperation.setFavorite(id, status));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProperty);

