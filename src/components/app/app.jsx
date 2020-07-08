import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/page/page.js";
import Main from "../main/main.jsx";
import PlaceScreen from "../place-screen/place-screen.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import ErrorComponent from "../error/error.jsx";
import {PageType} from "../../constants/page.js";
import {getCityOffers, getNearOffers, getError} from "../../reducer/data/selectors.js";
import {getPropertyOffer, getPageStep, getActiveOffer} from "../../reducer/page/selectors.js";

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
    const {offers, nearOffers, onAdvertCardTitleClick, step, propertyOffer, activeOffer} = this.props;

    if (offers === null) {
      return null;
    }

    switch (step) {
      case PageType.MAIN:
        return (
          <PlaceScreen
            type={step}
            color="gray">
            <Main offers={offers}
              onAdvertCardTitleClick={onAdvertCardTitleClick}
              activeOffer={activeOffer}/>
          </PlaceScreen>
        );

      case PageType.DETAILS:
        return (
          <PlaceScreen
            type={step}>
            <PlaceProperty offer={propertyOffer}
              nearOffers={nearOffers}/>
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
  step: PropTypes.oneOf([PageType.MAIN, PageType.DETAILS]).isRequired,
  propertyOffer: PropTypes.object,
  activeOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)]),
  error: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  propertyOffer: getPropertyOffer(state),
  nearOffers: getNearOffers(state),
  step: getPageStep(state),
  activeOffer: getActiveOffer(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAdvertCardTitleClick(offer) {
    dispatch(ActionCreator.changePageType(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};


