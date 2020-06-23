import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

const props = {
  offer: {
    pictures: [`img/apartment-05.jpg`],
    premium: true,
    cost: 10,
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
    id: 909,
  },
  onAdvertCardTitleClick: jest.fn(),
  onAdvertCardMouseOver: jest.fn(),
};


it(`Render PlaceList`, () => {
  const tree = renderer
      .create(
          <PlaceCard {...props}/>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
