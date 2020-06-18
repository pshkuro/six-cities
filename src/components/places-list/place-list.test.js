import React from "react";
import renderer from "react-test-renderer";
import PlaceList from "./place-list.jsx";

const props = {
  offers: [
    {
      picture: `img/apartment-01.jpg`,
      premium: false,
      cost: 120,
      description: `Good apartment`,
      type: `Apartment`,
      rating: 5,
      id: 11,
    }, {
      picture: `img/apartment-04.jpg`,
      premium: true,
      cost: 780,
      description: `Nice`,
      type: `Hotel`,
      rating: 1,
      id: 67,
    }, {
      picture: `img/apartment-05.jpg`,
      premium: false,
      cost: 50,
      description: `Good hotel`,
      type: `Apartment`,
      rating: 0,
      id: 607,
    }],

  onAdvertCardTitleClick: jest.fn(),
};

it(`Render PlaceList`, () => {


  const tree = renderer
    .create(
        <PlaceList {...props}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
