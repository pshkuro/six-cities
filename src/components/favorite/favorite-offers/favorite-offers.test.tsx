import * as React from "react";
import * as renderer from "react-test-renderer";
import {FavoriteOffers} from "./favorite-offers";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";

const props = {
  getFavoritesCityOffers: jest.fn(),
  favoriteOffers: [
    {
      city: `Paris`,
      cityCoordinates: {
        coordinates: [52.3909553943508, 4.85309666406198],
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
        }],
    },
  ],
};

const mockStore = configureStore([]);
const store = mockStore({
  OFFERS_FAVORITES: {
    favorites: [],
  },
  USER: {
    authorizationStatus: `AUTH`
  }
});

it(`FavoriteOffers render`, () => {
  const tree = renderer
  .create(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteOffers {...props}/>
        </BrowserRouter>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
