import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const props = {
  pins: [{
    coordinates: [1212, 454545],
    isActive: false
  },
  {
    coordinates: [1212, 454545],
    isActive: true
  }],
  cityCoordinates: {
    coordinates: [52.3909553943508, 4.85309666406198],
    zoom: 12,
  },
  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  }
};

it(`Render Map`, () => {
  const tree = renderer
  .create(
      <Map {...props}/>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
