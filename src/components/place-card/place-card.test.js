import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {PlaceCard} from "./place-card.jsx";

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
  onAdvertCardTitleClick: jest.fn(),
  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  }
};

const mockStore = configureStore([]);
const store = mockStore({
  onAdvertCardMouseOver: jest.fn(),
  onAdvertCardMouseOut: jest.fn(),
  setFavorite: jest.fn(),
});

it(`Render PlaceCard`, () => {
  const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <PlaceCard {...props}/>
            </BrowserRouter>
          </Provider>
      )
      .toJSON();

  expect(tree).toMatchSnapshot();
});
