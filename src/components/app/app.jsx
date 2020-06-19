import Main from "../main/main.jsx";
import PlaceProperty from "../place-property/place-properrty.jsx";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";


const advertCardTitleHandler = () => {};

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main offers={offers}
              onAdvertCardTitleClick={advertCardTitleHandler}/>
          </Route>
          <Route exact path="/property">
            <PlaceProperty/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};


