import React from "react";
import {mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {FavoriteOffers} from "./favorite-offers.jsx";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import FavoriteEmpty from "../favorite-empty/favorite-empty.jsx";

const props = {
  getFavoritesCityOffers: jest.fn((x) => x),
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

const mockStore = configureStore([thunk]);
const store = mockStore({
  OFFERS_FAVORITES: {
    favorites: [],
  },
  USER: {
    authorizationStatus: `AUTH`
  }
});

describe(`Favorite offers tests`, () => {
  it(`Favorite offers get offers from prop fn`, () => {
    mount(
        <Provider store={store}>
          <BrowserRouter>
            <FavoriteOffers {...props}/>
          </BrowserRouter>
        </Provider>
    );
    expect(props.getFavoritesCityOffers).toHaveBeenCalledTimes(1);

  });

  it(`Favorite offers page show empty page when no offers`, () => {
    const favoriteOffers = mount(
        <Provider store={store}>
          <BrowserRouter>
            <FavoriteOffers {...props}
              favoriteOffers={[]}/>
          </BrowserRouter>
        </Provider>
    );

    expect(favoriteOffers.contains(FavoriteEmpty)).toBe(true);
  });


});
