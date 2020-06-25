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
  city: [52.38333, 4.9],
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
