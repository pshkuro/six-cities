import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesPlaces from "./cities-places.jsx";

const props = {
  onAdvertCardTitleClick: jest.fn(),
  city: `Paris`,
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
    }],
  activeSortingType: `top-rated`,
  onSortingListItemClick: jest.fn((x) => x),
};

const mockStore = configureStore([]);

describe(`CitiesPlaces render tests`, () => {

  it(`CitiesPlaces render`, () => {
    const store = mockStore({
      onAdvertCardMouseOver: jest.fn(),
      onAdvertCardMouseOut: jest.fn(),
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <CitiesPlaces {...props}/>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});


