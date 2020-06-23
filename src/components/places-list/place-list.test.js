import React from "react";
import renderer from "react-test-renderer";
import PlaceList from "./place-list.jsx";

const props = {
  offers: [
    {
      pictures: [`img/apartment-01.jpg`],
      premium: false,
      cost: 120,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 5,
      title: `Place cool`,
      bedrooms: 2,
      guests: 10,
      conveniences: [`Beautiful`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 11,
    }, {
      pictures: [`img/apartment-04.jpg`],
      premium: true,
      cost: 780,
      description: [`Nice`],
      type: `Hotel`,
      rating: 1,
      title: `House in forest`,
      bedrooms: 22,
      guests: 100,
      conveniences: [`Tolter`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Poporo`,
        pro: true,
      },
      id: 67,
    }, {
      pictures: [`img/apartment-05.jpg`],
      premium: false,
      cost: 50,
      description: [`Good hotel`],
      type: `Apartment`,
      rating: 0,
      title: `Place cool`,
      bedrooms: 22,
      guests: 1,
      conveniences: [`TV`, `Toilet`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Feder`,
        pro: false,
      },
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
