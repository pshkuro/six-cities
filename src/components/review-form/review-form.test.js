import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";


const props = {
  authorizationStatus: `AUTH`,
  onFormSubmit: jest.fn(),
  onFieldChange: jest.fn(),
};

it(`ReviewForm Render`, () => {
  const tree = renderer
  .create(
      <ReviewForm {...props} />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
