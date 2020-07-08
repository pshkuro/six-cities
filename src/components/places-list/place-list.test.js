import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceList from "./place-list.jsx";

const props = {
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
      id: 89089,
    }, {
      previewImage: `img/apartment-01.jpg`,
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
      favourite: true,
      type: `Apartment`,
      rating: 6,
      bedrooms: 1,
      guests: 1,
      cost: 12000,
      conveniences: [`Cool vary cool place`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
        id: 10,
      },
      id: 89,
    }, {
      previewImage: `img/apartment-07.jpg`,
      pictures: [`img/apartment-02.jpg`],
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

  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  },
  onAdvertCardTitleClick: jest.fn(),
};

const mockStore = configureStore([]);

it(`Render PlaceList`, () => {
  const store = mockStore({
    onAdvertCardMouseOver: jest.fn(),
    onAdvertCardMouseOut: jest.fn(),
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <PlaceList {...props}/>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
