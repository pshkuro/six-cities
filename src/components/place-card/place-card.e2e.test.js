import {shallow} from "enzyme";
import PlaceCard from "./place-card.jsx";
import React from "react";

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
    id: 1212,
  },
  onAdvertCardTitleClick: jest.fn((x) => x),
  onAdvertCardMouseOver: jest.fn((x) => x),
};

it(`Hovering PlaceCard get to callback info about itself`, () => {

  const placeCard = shallow(
      <PlaceCard {...props}/>
  );

  placeCard.simulate(`mouseover`);

  expect(props.onAdvertCardMouseOver).toHaveBeenCalledTimes(1);
  expect(props.onAdvertCardMouseOver.mock.results[0].value).toMatchObject(props.offer);
});


it(`PlaceCard title should be clicked and get to callback info about itself`, () => {

  const placeCard = shallow(
      <PlaceCard {...props}/>
  );

  const advertCardTitle = placeCard.find(`.place-card__name`);
  advertCardTitle.simulate(`click`);

  expect(props.onAdvertCardTitleClick).toHaveBeenCalledTimes(1);
  expect(props.onAdvertCardTitleClick.mock.results[0].value).toMatchObject(props.offer);

});
