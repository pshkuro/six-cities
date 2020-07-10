import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.jsx";

const props = {
  onSignInFormSubmit: jest.fn(),
  onLocationSignInPageClick: jest.fn(),
};


it(`SignIn render`, () => {
  const tree = renderer
  .create(
      <SignIn {...props}/>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
