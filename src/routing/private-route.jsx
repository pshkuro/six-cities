import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "./routes.js";
import {AuthorizationStatus} from "../constants/page.js";
import {getAuthorizationStatus} from "../redux/user/selectors.js";


export function PrivateRoute({render, path, exact, authorizationStatus}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.SIGN_IN} />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);

