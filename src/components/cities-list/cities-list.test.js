import React from "react";
import renderer from "react-test-renderer";
import {CitiesList} from "./cities-list.jsx";

const props = {
  city: `Moscow`,
  onChooseCityClick: jest.fn(),
  cities: [`Paris`, `Moscow`],
  setDefaultCity: jest.fn(),
};

it(`CitiesList render`, () => {
  const tree = renderer
  .create(
      <CitiesList {...props}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
