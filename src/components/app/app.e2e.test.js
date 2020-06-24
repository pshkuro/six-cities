import {mount} from "enzyme";
import React from "react";
import App from "../app/app.jsx";
import PlaceProperty from "../place-property/place-property.jsx";
import PlaceCard from "../place-card/place-card.jsx";

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
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
      },
      id: 8989,
      reviwes: [{id: 12}, {id: 11}],
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
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1212,
      reviwes: [{id: 2}, {id: 9}],
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
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1012,
      reviwes: [{id: 90}, {id: 56}],
    }],
};

it(`Clicked place card get the same object that place property render`, () => {
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
