import React from "react";
import renderer from "react-test-renderer";
import FavoriteFooter from "./favorite-footer.jsx";

it(`FavoriteFooter render`, () => {
  const tree = renderer
  .create(
      <FavoriteFooter/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
