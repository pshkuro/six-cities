import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/reducer.js";
import Main from "../main/main.jsx";
import PlaceScreen from "../place-screen/place-screen.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import {PageType} from "../../constants/page.js";

class App extends PureComponent {
  render() {
    const {offers, nearOffers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            <PlaceProperty offer={offers[0]}
              nearOffers={nearOffers}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {offers, nearOffers, onAdvertCardTitleClick, step, activeOffer} = this.props;


    switch (step) {
      case PageType.MAIN:
        return (
          <PlaceScreen
            type={step}
            color="gray">
            <Main offers={offers}
              onAdvertCardTitleClick={onAdvertCardTitleClick}/>
          </PlaceScreen>
        );

      case PageType.DETAILS:
        return (
          <PlaceScreen
            type={step}>
            <PlaceProperty offer={activeOffer}
              nearOffers={nearOffers}/>
          </PlaceScreen>
        );
    }

    return null;
  }
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  nearOffers: PropTypes.array.isRequired,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
  step: PropTypes.oneOf([PageType.MAIN, PageType.DETAILS]).isRequired,
  activeOffer: PropTypes.object,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  activeOffer: state.activeOffer,
  nearOffers: state.nearOffers,
  step: state.step,
});

const mapDispatchToProps = (dispatch) => ({
  onAdvertCardTitleClick(offer) {
    dispatch(ActionCreator.changePageType(offer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};


