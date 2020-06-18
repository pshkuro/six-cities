import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const props = {
  offers: [
    {
      picture: `img/apartment-01.jpg`,
      premium: true,
      cost: 12,
      description: `Wood and stone place`,
      type: `Apartment`,
      rating: 2.4,
      id: 1212,
    }, {
      picture: `img/apartment-02.jpg`,
      premium: false,
      cost: 450,
      description: `Wood and stone place`,
      type: `Hotel`,
      rating: 4,
      id: 67,
    }, {
      picture: `img/apartment-01.jpg`,
      premium: false,
      cost: 560,
      description: `Good hotel`,
      type: `Apartment`,
      rating: 5,
      id: 55,
    }],
  onAdvertCardTitleClick: jest.fn(),
};


it(`Render Main`, () => {

  const tree = renderer
  .create(
      <Main {...props}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
