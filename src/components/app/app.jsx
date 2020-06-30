import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import PlaceScreen from "../place-screen/place-screen.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import {PageType} from "../../constants/page.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: PageType.MAIN,
      activeOffer: null,
    };

    this._handleAdvertCardTitleClick = this._handleAdvertCardTitleClick.bind(this);
  }

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
    const {offers, nearOffers} = this.props;


    switch (this.state.step) {
      case PageType.MAIN:
        return (
          <PlaceScreen
            type={this.state.step}
            color="gray">
            <Main offers={offers}
              onAdvertCardTitleClick={this._handleAdvertCardTitleClick}/>
          </PlaceScreen>
        );

      case PageType.DETAILS:
        return (
          <PlaceScreen
            type={this.state.step}>
            <PlaceProperty offer={this.state.activeOffer}
              nearOffers={nearOffers}/>
          </PlaceScreen>
        );
    }

    return null;
  }

  _handleAdvertCardTitleClick(offer) {
    this.setState({
      activeOffer: offer,
      step: PageType.DETAILS
    });
  }

}

App.propTypes = {
  offers: PropTypes.array.isRequired,
  nearOffers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps)(App);
export {App};


