import * as React from "react";
import * as renderer from "react-test-renderer";
import FavoriteEmpty from "./favorite-empty";

it(`FavoriteEmpty render`, () => {
  const tree = renderer
  .create(
      <FavoriteEmpty/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
