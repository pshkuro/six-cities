import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import PlaceProperty from "../place-property/place-property.jsx";

const PageState = {
  DEFAULT: `default`,
  DETAILS: `details`,
};


export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: PageState.DEFAULT,
      activeOffer: null,
    };

    this._handleAdvertCardTitleClick = this._handleAdvertCardTitleClick.bind(this);
  }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer">
            <PlaceProperty offer={offers[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _renderApp() {
    const {offers} = this.props;


    switch (this.state.step) {
      case PageState.DEFAULT:
        return (
          <Main offers={offers}
            onAdvertCardTitleClick={this._handleAdvertCardTitleClick}/>
        );

      case PageState.DETAILS:
        return (
          <PlaceProperty offer={this.state.activeOffer}/>
        );
    }

    return null;
  }

  _handleAdvertCardTitleClick(offer) {
    this.setState({
      activeOffer: offer,
      step: PageState.DETAILS
    });
  }

}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};


