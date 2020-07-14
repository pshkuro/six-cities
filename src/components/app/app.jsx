import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/page/page.js";
import Main from "../main/main.jsx";
import PlaceScreen from "../place-screen/place-screen.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import ErrorComponent from "../error/error.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {PageType} from "../../constants/page.js";
import {getCityOffers, getNearOffers, getError} from "../../redux/offers-data/selectors.js";
import {getPropertyOffer, getPageStep, getActiveOffer} from "../../redux/page/selectors.js";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import {getReviews} from "../../redux/reviews/selectors.js";
import {Operation as DataOperation} from "../../redux/user/user.js";
import {Operation as ReviewsOperation} from "../../redux/reviews/reviews.js";

class App extends PureComponent {
  render() {
    const {offers, nearOffers, error} = this.props;
    if (error) {
      return <ErrorComponent />;
    }
    if (offers === null) {
      return null;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            {offers.offers && offers.offers[0] && <PlaceProperty offer={offers.offers[0]}
              nearOffers={nearOffers}/>}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {
      offers,
      nearOffers,
      onAdvertCardTitleClick,
      step, propertyOffer,
      activeOffer,
      authorizationStatus,
      login,
      reviews
    } = this.props;

    if (offers === null) {
      return null;
    }

    switch (step) {
      case PageType.MAIN:
        return (
          <PlaceScreen
            type={step}
            color="gray"
            authorizationStatus={authorizationStatus}>
            <Main offers={offers}
              onAdvertCardTitleClick={onAdvertCardTitleClick}
              activeOffer={activeOffer}/>
          </PlaceScreen>
        );

      case PageType.DETAILS:
        return (
          <PlaceScreen
            type={step}
            authorizationStatus={authorizationStatus}>
            <PlaceProperty offer={propertyOffer}
              nearOffers={nearOffers}
              reviews={reviews}/>
          </PlaceScreen>
        );

      case PageType.SIGN_IN:
        return (
          <PlaceScreen
            type="login"
            authorizationStatus={authorizationStatus}
            color="gray">
            <SignIn
              onSignInFormSubmit={login}/>
          </PlaceScreen>
        );

      default: return null;
    }

  }
}

App.propTypes = {
  offers: PropTypes.object,
  nearOffers: PropTypes.array.isRequired,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
  step: PropTypes.oneOf([PageType.MAIN, PageType.DETAILS, PageType.SIGN_IN]).isRequired,
  propertyOffer: PropTypes.object,
  activeOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)]),
  error: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  propertyOffer: getPropertyOffer(state),
  nearOffers: getNearOffers(state),
  step: getPageStep(state),
  activeOffer: getActiveOffer(state),
  error: getError(state),
  authorizationStatus: getAuthorizationStatus(state),
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAdvertCardTitleClick(step, offer) {
    dispatch(ActionCreator.changePageType(step, offer));
    dispatch(ReviewsOperation.getReviews(offer.id));
  },

  login(authData) {
    dispatch(DataOperation.login(authData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};


