import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const props = {
  offer: {
    picture: `img/apartment-05.jpg`,
    premium: true,
    cost: 10,
    description: `Good apartment`,
    type: `Apartment`,
    rating: 5,
    id: 909,
  },
  onAdvertCardTitleClick: jest.fn(),
  onAdvertCardMouseOver: jest.fn(),
};


it(`Render PlaceList`, () => {
  const tree = renderer
      .create(
          <PlaceCard {...props}/>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
