import * as React from "react";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {SignIn} from "./sign-in";
import {AuthorizationStatus} from "../../types/types";
import {noop} from "../../utils/common";

const props = {
  cities: [`Paris`, `Moscow`],
  onSignInFormSubmit: jest.fn((x) => x),
  onLocationSignInPageClick: jest.fn((x) => x),
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

describe(`Sign-In tests`, () => {
  it(`Post form should to callback`, () => {
    const signIn = mount(
        <BrowserRouter>
          <SignIn {...props}/>
        </BrowserRouter>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    const mockUserInfo = {
      login: ``,
      password: ``,
    };

    const signInForm = signIn.find(`.login__form`);
    signInForm.simulate(`submit`, {
      preventDefault: noop
    });

    expect(props.onSignInFormSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSignInFormSubmit.mock.calls[0][0]).toEqual(mockUserInfo);
  });

  it(`Sign in page should not show when user authorized`, () => {
    const signIn = mount(
        <BrowserRouter>
          <SignIn {...props}
            authorizationStatus={AuthorizationStatus.NO_AUTH}/>
        </BrowserRouter>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    expect(signIn.find(`.page__main--login`)).toEqual({});
  });


});
