import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/page/page.js";
import {PageType} from "../../constants/page.js";

export function PlaceScreen({children, color, type, authorizationStatus, onPageHeaderSignInClick, onHeaderLogoClick}) {
  const handleHeaderLogoClick = () => onHeaderLogoClick(PageType.MAIN);
  const isAuthorized = authorizationStatus === `NO_AUTH` ?
    <span
      className="header__login"
      onClick={() => onPageHeaderSignInClick(PageType.SIGN_IN)}>
    Sign in
    </span>
    : <span className="header__user-name user__name">Oliver.conner@gmail.com</span>;

  return (
    <div className={`page
      ${color && `page--${color}`}
      ${type && `page--${type}`}
    `}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="#">
                <img
                  className="header__logo"
                  onClick={handleHeaderLogoClick}
                  src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {isAuthorized}
                  </a>
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

PlaceScreen.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  authorizationStatus: PropTypes.string.isRequired,
  onPageHeaderSignInClick: PropTypes.func.isRequired,
  onHeaderLogoClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPageHeaderSignInClick(step) {
    dispatch(ActionCreator.changePageType(step));
  },

  onHeaderLogoClick(step) {
    dispatch(ActionCreator.changePageType(step));
  },
});

export default connect(null, mapDispatchToProps)(PlaceScreen);

