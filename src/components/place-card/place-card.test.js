import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const offer = {
  picture: `img/apartment-05.jpg`,
  premium: true,
  cost: 10,
  description: `Good apartment`,
  type: `Apartment`,
  rating: 5,
};

it(`Render PlaceList`, () => {
  const tree = renderer
      .create(
          <PlaceCard
            offer={offer}
            onAdvertCardTitleClick={() => {}}
            onAdvertCardMouseOver={() => {}}/>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
