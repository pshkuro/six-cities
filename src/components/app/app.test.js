import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const offersMock = [
  {
    picture: `img/apartment-01.jpg`,
    premium: false,
    cost: 120,
    description: `Wood and stone place`,
    type: `Apartment`,
    rating: 1.8,
  }, {
    picture: `img/apartment-02.jpg`,
    premium: true,
    cost: 400,
    description: `Wood and stone place`,
    type: `Hotel`,
    rating: 4,
  }, {
    picture: `img/apartment-01.jpg`,
    premium: true,
    cost: 5000,
    description: `Good hotel`,
    type: `Apartment`,
    rating: 1,
  }];

it(`Render App`, () => {
  const tree = renderer
  .create(
      <App
        offers={offersMock}
      />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
