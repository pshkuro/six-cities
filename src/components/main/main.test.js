import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const props = {
  offers: [
    {
      pictures: [`img/apartment-01.jpg`],
      premium: true,
      cost: 12,
      description: [`Wood and stone place`],
      type: `Apartment`,
      rating: 2.4,
      title: `Place cool`,
      bedrooms: 2,
      guests: 10,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1212,
    }, {
      pictures: [`img/apartment-02.jpg`],
      premium: false,
      cost: 450,
      description: [`Wood and stone place`],
      type: `Hotel`,
      rating: 5,
      title: `Place cool`,
      bedrooms: 1,
      guests: 14,
      conveniences: [`TV`, `Tolet`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Cenny`,
        pro: true,
      },
      id: 67,
    }, {
      pictures: [`img/apartment-01.jpg`],
      premium: false,
      cost: 560,
      description: [`Good hotel`],
      type: `Apartment`,
      rating: 1.8,
      title: `Place cool`,
      bedrooms: 12,
      guests: 100,
      conveniences: [`TV`, `Tolet`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
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
