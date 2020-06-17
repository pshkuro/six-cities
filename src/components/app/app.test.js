import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offers = [
  {
    picture: `img/apartment-01.jpg`,
    premium: false,
    cost: 130,
    description: `Wood and stone place`,
    type: `Apartment`,
    rating: 1.8,
  }, {
    picture: `img/apartment-02.jpg`,
    premium: true,
    cost: 40,
    description: `Wood and stone place`,
    type: `Hotel`,
    rating: 4,
  }, {
    picture: `img/apartment-01.jpg`,
    premium: true,
    cost: 500,
    description: `Good hotel`,
    type: `Apartment`,
    rating: 1,
  }];

it(`Render App`, () => {
  const tree = renderer
  .create(
      <App
        offers={offers}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
