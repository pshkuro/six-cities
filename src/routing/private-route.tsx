import * as React from "react";
import {connect} from "react-redux";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AppRoute} from "./routes";
import {AuthorizationStatus} from "../constants/page";
import {AuthorizationStatus as AuthorizationStatusType} from "../types/types";
import {getAuthorizationStatus} from "../redux/user/selectors";

type Props = RouteProps & {
  authorizationStatus: AuthorizationStatusType;
  render: () => React.ReactNode;
}

export function PrivateRoute({render, path, exact, authorizationStatus}: Props): JSX.Element {
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


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);

