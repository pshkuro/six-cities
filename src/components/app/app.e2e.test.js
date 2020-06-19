import App from "../app/app.jsx";
import {mount} from "enzyme";
import PlaceProperty from "../place-property/place-property.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import React from "react";

const props = {
  offers: [
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
      type: `Apartment`,
      rating: 1.8,
      bedrooms: 5,
      guests: 1,
      cost: 120,
      conveniences: [`Cool vary cool place`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
      },
      id: 8989,
    }, {
      pictures: [`img/apartment-02.jpg`],
      premium: true,
      cost: 400,
      description: [`Wood and stone place`],
      type: `Hotel`,
      rating: 4,
      title: `Place cool`,
      bedrooms: 2,
      guests: 10,
      conveniences: [`Beautiful`, `Cize`, `Olo`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1212,
    }, {
      pictures: [`img/apartment-01.jpg`],
      premium: true,
      cost: 5000,
      description: [`Good hotel`],
      type: `Apartment`,
      rating: 1,
      title: `Place cool`,
      bedrooms: 1,
      guests: 15,
      conveniences: [`Beautiful`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1012,
    }],
  // onAdvertCardTitleClick: jest.fn((x) => x),
};

it(`yura`, () => {
  const appComponent = mount(
      <App {...props} />
  );

  const placeCard = appComponent.find(PlaceCard).first();
  const placeCardOffer = placeCard.props().offer;
  const placeCardTitle = placeCard.find(`.place-card__name`);

  placeCardTitle.simulate(`click`, {preventDefault() {}});

  const placeProperty = appComponent.find(PlaceProperty);
  const placePropertyOffer = placeProperty.props().offer;


  expect(placePropertyOffer).toEqual(placeCardOffer);
});
