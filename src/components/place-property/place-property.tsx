import * as React from "react";
import {connect} from "react-redux";
import {PureComponent} from "react";
import {Link} from "react-router-dom";
import {ActionCreator as OffersDataActionCreator} from "../../redux/offers-data/offers-data";
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
import PlaceList from "../places-list/place-list";
import {ratingStars} from "../../constants/offer";
import ReviewsList from "../reviews-list/reviews-list";


export class PlaceProperty extends React.PureComponent {
  componentDidMount() {
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

    const {cityCoordinates, offers: nearPropertyOffers} = nearOffers;
    const {coordinates, zoom} = cityCoordinates;

    const isOwnerPro = pro ? `property__avatar-wrapper property__avatar-wrapper--pro` : ``;
    const pins = nearPropertyOffers.map((nearOffer) => ({
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

    const isOfferFavorite = favourite ? 0 : 1;
    const handlePropertyButtonClick = () => {
      setPropertyFavorite(id, isOfferFavorite, offer);
    };

    return (
      <main className="page__main page__main--property" id={id}>
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {pictures.map((picture) => {
                return (
                  <div className="property__image-wrapper" key={Math.random()}>
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
                      onClick={handlePropertyButtonClick}
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
                  <span style={{width: `${ratingStars[Math.round(rating)]}%`}}></span>
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
                  {conveniences.map((convenience) => {
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
                  {description.map((paragraph) => {
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

// PlaceProperty.propTypes = {
//   offer: PropTypes.exact({
//     pictures: PropTypes.arrayOf(PropTypes.string),
//     previewImage: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.arrayOf(PropTypes.string),
//     premium: PropTypes.bool,
//     favourite: PropTypes.bool,
//     type: PropTypes.string,
//     rating: PropTypes.number,
//     bedrooms: PropTypes.number,
//     guests: PropTypes.number,
//     cost: PropTypes.number,
//     conveniences: PropTypes.arrayOf(PropTypes.string),
//     coordinates: PropTypes.arrayOf(PropTypes.number),
//     owner: PropTypes.exact({
//       avatar: PropTypes.string,
//       name: PropTypes.string,
//       pro: PropTypes.bool,
//       id: PropTypes.number,
//     }).isRequired,
//     id: PropTypes.number,
//     reviews: PropTypes.array,
//   }).isRequired,
//   nearOffers: PropTypes.exact({
//     city: PropTypes.string,
//     cityCoordinates: PropTypes.exact({
//       coordinates: PropTypes.array,
//       zoom: PropTypes.number,
//     }),
//     offers: PropTypes.arrayOf(PropTypes.object)
//   }),
//   getPropertyOfferInfo: PropTypes.func.isRequired,
//   getPropertyNearOffers: PropTypes.func.isRequired,
//   reviews: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(null)]),
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }),
//   setPropertyFavorite: PropTypes.func.isRequired,
//   authorizationStatus: PropTypes.string.isRequired,
// };

const mapStateToProps = (state, props) => ({
  offer: getPropertyOffer(state, props.match.params.id),
  reviews: getReviews(state),
  nearOffers: getNearOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export const mapDispatchToProps = (dispatch) => ({
  getPropertyOfferInfo(offerId) {
    dispatch(ReviewsOperation.getReviews(offerId));
  },

  getPropertyNearOffers(id) {
    dispatch(OfferOperation.getNearOffers(id));
  },

  setPropertyFavorite(id, status, offer) {
    dispatch(OffersDataActionCreator.setFavoriteOffer(offer));
    dispatch(FavoriteOperation.setFavorite(id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceProperty);

