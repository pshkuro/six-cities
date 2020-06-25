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
    coordinates: [52.3909553943508, 4.85309666406198],
    owner: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Clara`,
      pro: false,
    },
    id: 909,
    reviwes: [{id: 1}, {id: 5}],
  },
  nearOffers: [
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
      type: `Apartment`,
      rating: 1.8,
      bedrooms: 5,
      guests: 1,
      cost: 120,
      conveniences: [`Cool vary cool place`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
      },
      id: 112},
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
      type: `Apartment`,
      rating: 1.8,
      bedrooms: 5,
      guests: 1,
      cost: 120,
      conveniences: [`Cool vary cool place`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
      },
      id: 12},
  ]
};

it(`Render PlaceProperty`, () => {
  const tree = renderer
  .create(
      <PlaceProperty {...props} />,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
