import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const offers = [
  {
    picture: `img/apartment-01.jpg`,
    premium: true,
    cost: 12,
    description: `Wood and stone place`,
    type: `Apartment`,
    rating: 2.4,
  }, {
    picture: `img/apartment-02.jpg`,
    premium: false,
    cost: 450,
    description: `Wood and stone place`,
    type: `Hotel`,
    rating: 4,
  }, {
    picture: `img/apartment-01.jpg`,
    premium: false,
    cost: 560,
    description: `Good hotel`,
    type: `Apartment`,
    rating: 5,
  }];


it(`Render Main`, () => {
  const tree = renderer
  .create(
      <Main
        offers={offers}
        onAdvertCardTitleClick={() => {}}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
