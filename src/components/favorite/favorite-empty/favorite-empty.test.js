import React from "react";
import renderer from "react-test-renderer";
import FavoriteEmpty from "./favorite-empty.jsx";

it(`FavoriteEmpty render`, () => {
  const tree = renderer
  .create(
      <FavoriteEmpty/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
