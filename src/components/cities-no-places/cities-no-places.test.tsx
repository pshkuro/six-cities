import * as React from "react";
import * as renderer from "react-test-renderer";
import CitiesNoPlaces from "./cities-no-places";

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
