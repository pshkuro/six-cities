import * as React from "react";
import {connect} from "react-redux";
import {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {AppRoute} from "../../routing/routes";
import ErrorComponent from "../error/error";
import FavoriteOffers from "../favorite/favorite-offers/favorite-offers";
import {getCityOffers, getError} from "../../redux/offers-data/selectors";
import {getActiveOffer} from "../../redux/page/selectors";
import {getAuthorizationStatus} from "../../redux/user/selectors";
import {Operation as DataOperation} from "../../redux/user/user";
import Main from "../main/main";
import PlaceScreen from "../place-screen/place-screen";
import PlaceProperty from "../place-property/place-property";
import PrivateRoute from "../../routing/private-route";
import SignIn from "../sign-in/sign-in";

class App extends React.PureComponent {
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
                onSignInFormSubmit={login}
                authorizationStatus={authorizationStatus}/>
            </PlaceScreen>
          </Route>

          <PrivateRoute exact path={AppRoute.FAVORITES} render={() => {
            return <PlaceScreen
              authorizationStatus={authorizationStatus}
              type="favorites-empty"
            >
              <FavoriteOffers/>
            </PlaceScreen>;
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

export const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(DataOperation.login(authData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {App};


