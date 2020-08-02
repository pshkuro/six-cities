import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorComponent from "./error";

it(`ReviewItem render`, () => {
  const tree = renderer
  .create(
      <ErrorComponent />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
