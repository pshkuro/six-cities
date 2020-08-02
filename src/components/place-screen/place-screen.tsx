import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../routing/routes";
import {AuthorizationStatus} from "../../constants/page";
import {AuthorizationStatus as AuthorizationStatusType} from "../../types/types";
import {getProfile} from "../../redux/user/selectors";

interface Props {
  children: React.ReactNode;
  color?: string;
  type: string;
  authorizationStatus: AuthorizationStatusType;
  profile: {
    id?: number;
    email: string;
    name?: string;
    avatar_url?: string;
    is_pro?: boolean;
  };
}

export function PlaceScreen({children, color, type, authorizationStatus, profile}: Props): JSX.Element {

  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const avatarComponent = !isAuthorized ?
    <span className="header__login">Sign in</span> :
    <span className="header__user-name user__name">{profile && profile.email}</span>;

  return (
    <div className={`page
      ${color ? `page--${color}` : ``}
      ${type ? `page--${type}` : ``}
    `}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link"
                to={AppRoute.MAIN}>
                <img
                  className="header__logo"
                  src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    to={isAuthorized ? AppRoute.FAVORITES : AppRoute.SIGN_IN}
                    className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {avatarComponent}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}


const mapStateToProps = (state) => ({
  profile: getProfile(state),
});


export default connect(mapStateToProps)(PlaceScreen);

