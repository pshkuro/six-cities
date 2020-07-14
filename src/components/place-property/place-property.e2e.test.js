import React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {PlaceProperty} from "./place-property.jsx";
import Map from "../map/map.jsx";

const props = {
  offer: {
    previewImage: `img/apartment-01.jpg`,
    pictures: [`img/apartment-01.jpg`],
    title: `good rererer`,
    description: [`Wood and stone place`],
    premium: false,
    favourite: true,
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
      id: 12,
    },
    id: 8989,
  },
  nearOffers: [
    {
      previewImage: `img/apartment-01.jpg`,
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
      id: 112},
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
      id: 12},
  ],
  reviews: [],
};

const mockStore = configureStore([]);

window.Intl.DateTimeFormat = class {
  format() {}
};

it(`Map render the same active pin that get to place property`, () => {
  const store = mockStore({
    onAdvertCardMouseOver: jest.fn(),
    onAdvertCardMouseOut: jest.fn(),
    USER: {
      authorizationStatus: `NO_AUTH`
    },
  });

  const placeProperty = mount(
      <Provider store={store}>
        <PlaceProperty {...props} />
      </Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  );

  const placePropertyComponent = placeProperty.find(PlaceProperty);
  const placePropertyActiveOffer = placePropertyComponent.props().offer;
  const placePropertyActiveOfferCoordinates = placePropertyActiveOffer.coordinates;

  const map = placeProperty.find(Map);
  const mapActivePin = map.props().pins.find((pin) => pin.isActive);
  const mapActivePinCoordinates = mapActivePin.coordinates;

  expect(placePropertyActiveOfferCoordinates).toBe(mapActivePinCoordinates);
});


