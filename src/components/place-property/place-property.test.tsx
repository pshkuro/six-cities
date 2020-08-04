import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import {PlaceProperty} from "./place-property";
import {AuthorizationStatus} from "../../types/types";

const props = {
  offer: {
    previewImage: `img/apartment-01.jpg`,
    pictures: [`img/apartment-01.jpg`],
    title: `good rererer`,
    description: [`Wood and stone place`],
    premium: false,
    favourite: false,
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
  nearOffers: [{
    city: `Amsterdam`,
    cityCoordinates: {
      coordinates: [21212, 1212],
      zoom: 12,
    },
    offers: [
      {
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
      }
    ]
  }],
  reviews: [],
  match: {
    params: {
      id: `3`,
    }
  },
  getPropertyOfferInfo: jest.fn((x) => x),
  setPropertyFavorite: jest.fn((x) => x),
  setLocalPropertyFavorite: jest.fn((x) => x),
  getPropertyNearOffers: jest.fn((x)=> x),
  authorizationStatus: AuthorizationStatus.AUTH,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window.Intl.DateTimeFormat as any) = class {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  format() {}
};

const mockStore = configureStore([]);

it(`Render PlaceProperty`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: `AUTH`,
    },
  });


  const tree = renderer
  .create(
      <Provider store={store}>
        <BrowserRouter>
          <PlaceProperty {...props} />
        </BrowserRouter>
      </Provider>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();
  expect(tree).toMatchSnapshot();
});
