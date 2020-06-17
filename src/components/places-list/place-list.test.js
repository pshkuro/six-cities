import React from "react";
import renderer from "react-test-renderer";
import PlaceList from "./place-list.jsx";

const offers = [
  {
    picture: `img/apartment-01.jpg`,
    premium: false,
    cost: 120,
    description: `Good apartment`,
    type: `Apartment`,
    rating: 5,
  }, {
    picture: `img/apartment-04.jpg`,
    premium: true,
    cost: 780,
    description: `Nice`,
    type: `Hotel`,
    rating: 1,
  }, {
    picture: `img/apartment-05.jpg`,
    premium: false,
    cost: 50,
    description: `Good hotel`,
    type: `Apartment`,
    rating: 0,
  }];

it(`Render PlaceList`, () => {
  const tree = renderer
    .create(
        <PlaceList
          offers={offers}
          onAdvertCardTitleClick={() => {}}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
