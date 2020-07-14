import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {SignIn} from "./sign-in.jsx";

const props = {
  onSignInFormSubmit: jest.fn(),
  cities: [`Paris`, `Moscow`],
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
