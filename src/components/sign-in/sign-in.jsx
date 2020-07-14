import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../routing/routes.js";
import {getActiveCity} from "../../redux/offers-data/selectors.js";


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
    const {city} = this.props;

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
              className="locations__item">
              <Link
                to={AppRoute.MAIN}
                className="locations__item-link">
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }
}

SignIn.propTypes = {
  city: PropTypes.string.isRequired,
  onSignInFormSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getActiveCity(state),
});

export default connect(mapStateToProps)(SignIn);

