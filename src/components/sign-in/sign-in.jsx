import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/page/page.js";
import {City, PageType} from "../../constants/page.js";


export class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSignInFormSubmit} = this.props;

    evt.preventDefault();

    onSignInFormSubmit({
      login: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });

    this.loginRef.current.value = ``;
    this.passwordRef.current.value = ``;
  }

  render() {
    const {onLocationSignInPageClick} = this.props;
    const handleLocationSignInPageClick = () => onLocationSignInPageClick(PageType.MAIN, City.AMSTERDAM);

    return (
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              onSubmit={this._handleSubmit}
              action="#"
              method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  ref={this.loginRef}
                  type="email" name="email" placeholder="Email" required=""/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  ref={this.passwordRef}
                  type="password" name="password" placeholder="Password" required=""/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div
              className="locations__item"
              onClick={handleLocationSignInPageClick}>
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

SignIn.propTypes = {
  onSignInFormSubmit: PropTypes.func.isRequired,
  onLocationSignInPageClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLocationSignInPageClick(step, city) {
    dispatch(ActionCreator.chooseCity(city));
    dispatch(ActionCreator.changePageType(step));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);

