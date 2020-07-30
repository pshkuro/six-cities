import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {SignIn} from "./sign-in";
import {AuthorizationStatus} from "../../types/types";

const props = {
  onSignInFormSubmit: jest.fn(),
  cities: [`Paris`, `Moscow`],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};


it(`SignIn render`, () => {
  const tree = renderer
  .create(
      <BrowserRouter>
        <SignIn {...props}/>
      </BrowserRouter>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
