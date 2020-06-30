import React from "react";
import renderer from "react-test-renderer";
import CitiesNoPlaces from "./cities-no-places.jsx";

const props = {
  city: `Moscow`,
};

it(`CitiesNoPlaces render`, () => {
  const tree = renderer
  .create(
      <CitiesNoPlaces {...props}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
