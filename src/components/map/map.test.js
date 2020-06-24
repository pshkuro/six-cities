import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

const props = {
  offers: [
    {
      pictures: ``,
      premium: ``,
      cost: ``,
      description: ``,
      type: ``,
      rating: ``,
      title: ``,
      bedrooms: ``,
      guests: ``,
      conveniences: ``,
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: ``,
        name: ``,
        pro: ``,
      },
      id: ``,
    },
    {
      pictures: ``,
      premium: ``,
      cost: ``,
      description: ``,
      type: ``,
      rating: ``,
      title: ``,
      bedrooms: ``,
      guests: ``,
      conveniences: ``,
      coordinates: [52.369553943507, 4.85309666406197],
      owner: {
        avatar: ``,
        name: ``,
        pro: ``,
      },
      id: ``,
    },
  ],
  city: [52.38333, 4.9],
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
