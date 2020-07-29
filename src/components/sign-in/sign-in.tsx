import * as React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {AppRoute} from "../../routing/routes";
import {AuthorizationStatus} from "../../constants/page";
import {AuthorizationStatus as AuthorizationStatusType} from "../../types/types";
import {getCities} from "../../redux/offers-data/selectors";

interface SignInFormSubmitParams {
  login: string;
  password: string;
}

interface Props {
  cities: Array<string>;
  authorizationStatus: AuthorizationStatusType;
  onSignInFormSubmit: ({login, password}: SignInFormSubmitParams) => void;
}

export class SignIn extends React.PureComponent<Props, {}> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  private _handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
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
    const {cities, authorizationStatus} = this.props;
    const firstCity = cities[0];

    return (
      authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.MAIN}/> :
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
                    type="email" name="email" placeholder="Email" required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    ref={this.passwordRef}
                    type="password" name="password" placeholder="Password" required/>
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
                  <span>{firstCity}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: getCities(state),
});

export default connect(mapStateToProps)(SignIn);

