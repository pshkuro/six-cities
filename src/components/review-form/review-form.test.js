import React from "react";
import renderer from "react-test-renderer";
import {ReviewForm} from "./review-form.jsx";


const props = {
  authorizationStatus: `AUTH`,
};

it(`ReviewForm Render`, () => {
  const tree = renderer
  .create(
      <ReviewForm {...props} />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
