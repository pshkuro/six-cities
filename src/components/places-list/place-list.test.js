import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceList from "./place-list.jsx";

const props = {
  offers: [
    {
      pictures: [`img/apartment-01.jpg`],
      premium: false,
      cost: 120,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 5,
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
      id: 11,
      reviwes: [{}, {}],
    }, {
      pictures: [`img/apartment-04.jpg`],
      premium: true,
      cost: 780,
      description: [`Nice`],
      type: `Hotel`,
      rating: 1,
      title: `House in forest`,
      bedrooms: 22,
      guests: 100,
      conveniences: [`Tolter`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Poporo`,
        pro: true,
      },
      id: 67,
      reviwes: [{}, {}],
    }, {
      pictures: [`img/apartment-05.jpg`],
      premium: false,
      cost: 50,
      description: [`Good hotel`],
      type: `Apartment`,
      rating: 0,
      title: `Place cool`,
      bedrooms: 22,
      guests: 1,
      conveniences: [`TV`, `Toilet`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Feder`,
        pro: false,
      },
      id: 607,
      reviwes: [{}, {}],
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
