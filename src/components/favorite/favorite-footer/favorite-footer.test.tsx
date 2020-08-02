import * as React from "react";
import * as renderer from "react-test-renderer";
import FavoriteFooter from "./favorite-footer";

it(`FavoriteFooter render`, () => {
  const tree = renderer
  .create(
      <FavoriteFooter/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
