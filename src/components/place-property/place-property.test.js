import React from "react";
import renderer from "react-test-renderer";
import PlaceProperty from "./place-property.jsx";

const props = {
  offer: {
    pictures: [`img/apartment-05.jpg`],
    premium: true,
    cost: 11,
    description: [`Good apartment`],
    type: `Apartment`,
    rating: 2,
    title: `Place cool`,
    bedrooms: 1,
    guests: 1,
    conveniences: [`Beautiful`],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Clara`,
      pro: false,
    },
    id: 909,
  },
};

it(`Render PlaceProperty`, () => {
  const tree = renderer
  .create(
      <PlaceProperty {...props} />
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
