import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const props = {
  offers: [
    {
      picture: `img/apartment-01.jpg`,
      premium: false,
      cost: 120,
      description: `Wood and stone place`,
      type: `Apartment`,
      rating: 1.8,
      id: 8989,
    }, {
      picture: `img/apartment-02.jpg`,
      premium: true,
      cost: 400,
      description: `Wood and stone place`,
      type: `Hotel`,
      rating: 4,
      id: 1212,
    }, {
      picture: `img/apartment-01.jpg`,
      premium: true,
      cost: 5000,
      description: `Good hotel`,
      type: `Apartment`,
      rating: 1,
      id: 1012,
    }],
};

it(`Render App`, () => {
  const tree = renderer
  .create(
      <App {...props}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
