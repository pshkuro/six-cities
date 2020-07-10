import React from "react";
import renderer from "react-test-renderer";
import ErrorComponent from "./error.jsx";

it(`ReviewItem render`, () => {
  const tree = renderer
  .create(
      <ErrorComponent />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
