import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import PlaceScreen from "../place-screen/place-screen.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import ErrorComponent from "../error/error.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import FavoriteOffers from "../favorite-offers/favorite-offers.jsx";
import {getCityOffers, getError} from "../../redux/offers-data/selectors.js";
import {getActiveOffer} from "../../redux/page/selectors.js";
import {getAuthorizationStatus} from "../../redux/user/selectors.js";
import {Operation as DataOperation} from "../../redux/user/user.js";
import {AppRoute} from "../../routing/routes.js";
import PrivateRoute from "../../routing/private-route.jsx";


class App extends PureComponent {
  render() {
    const {offers,
      error,
      authorizationStatus,
      login,
      activeOffer,
    } = this.props;

    if (error) {
      return <ErrorComponent />;
    }

    if (offers === null) {
      return null;
    }


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <PlaceScreen
              type="main"
              color="gray"
              authorizationStatus={authorizationStatus}>
              <Main offers={offers}
                activeOffer={activeOffer}/>
            </PlaceScreen>
          </Route>

          <Route exact path={AppRoute.ROOM} render={(props) => {
            return <PlaceScreen
              type="details"
              authorizationStatus={authorizationStatus}>
              <PlaceProperty {...props}/>
            </PlaceScreen>;
          }}
          />

          <Route exact path={AppRoute.SIGN_IN}>
            <PlaceScreen
              type="login"
              authorizationStatus={authorizationStatus}
              color="gray">
              <SignIn
                onSignInFormSubmit={login}/>
            </PlaceScreen>
          </Route>

          <PrivateRoute exact path={AppRoute.FAVORITES} render={() => {
            return (<FavoriteOffers/>);
          }}/>

          <Route component={ErrorComponent}/>

        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.object,
  activeOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)]),
  error: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  activeOffer: getActiveOffer(state),
  error: getError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(DataOperation.login(authData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};


