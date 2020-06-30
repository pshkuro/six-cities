import React from "react";
import {mount} from "enzyme";
import {Main} from "./main.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import Map from "../map/map.jsx";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";
import { offers } from "../../mocks/offers.js";

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
      reviwes: [{}, {}],
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
      reviwes: [{}, {}],
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
      reviwes: [{}, {}],
    }],
  onAdvertCardTitleClick: jest.fn(),
};

it(`Hovering PlaceCard callback get the same active offer that go in map`, () => {
  const main = mount(
      <Main {...props}/>
  );

  const placeCard = main.find(PlaceCard).first();
  const placeCardOffer = placeCard.props().offer;

  placeCard.simulate(`mouseover`, {preventDefault() {}});

  const activeOffer = main.state().activeOffer;

  expect(activeOffer).toEqual(placeCardOffer);

  const map = main.find(Map);
  const mapActivePin = map.props().pins.find((pin) => pin.isActive);
  const mapActivePinCoordinates = mapActivePin.coordinates;

  expect(activeOffer.coordinates).toBe(mapActivePinCoordinates);
});

it(`Mouseout on PlaceCard put null active offer in state`, () => {
  const main = mount(
      <Main {...props}/>
  );

  const placeCard = main.find(PlaceCard).first();
  placeCard.simulate(`mouseover`, {preventDefault() {}});
  placeCard.simulate(`mouseout`, {preventDefault() {}});

  const activeOffer = main.state().activeOffer;

  expect(activeOffer).toBe(null);

});

it(`When no office show CitiesNoPlaces component`, () => {
  const main = mount(
      <Main/>
  );
  const offersPlacesContainer = main.find(`.cities__places-container`);

  expect(main.find(CitiesNoPlaces)).toBeDefined();
  expect(offersPlacesContainer).toBeUndefined();
});
