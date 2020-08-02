import * as React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import CitiesPlaces from "./cities-places";
import {Sorting} from "../../types/types";

const props = {
  city: `Paris`,
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
      id: 80989,
    }],
  activeSortingType: Sorting.DEFAULT,
  onSortingListItemClick: jest.fn(),
};

const mockStore = configureStore([]);

describe(`CitiesPlaces tests`, () => {

  it(`Click on city should to callback`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `AUTH`,
      }
    });

    const citiesPlaces = mount(
        <Provider store={store}>
          <BrowserRouter>
            <CitiesPlaces {...props}/>
          </BrowserRouter>
        </Provider>
    );

    const citiesPlacesSortingListItem = citiesPlaces.find(`.places__option`).last();
    const listItemValue = citiesPlacesSortingListItem.props().value;
    citiesPlacesSortingListItem.simulate(`click`);
    expect(props.onSortingListItemClick).toHaveBeenCalledTimes(1);
    expect(props.onSortingListItemClick.mock.calls[0][0]).toBe(listItemValue);

  });
});

