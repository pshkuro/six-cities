import * as React from "react";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";
import {PlaceProperty} from "./place-property";
import Map from "../map/map";
import {AuthorizationStatus} from "../../types/types";
import {noop} from "../../utils/common";

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

const propsWithoutOffer = {
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
  offer: undefined,
  reviews: [],
  match: {
    params: {
      id: `3`,
    }
  },
  getPropertyOfferInfo: jest.fn((x) => x),
  setPropertyFavorite: jest.fn((x) => x),
  getPropertyNearOffers: jest.fn((x)=> x),
  authorizationStatus: AuthorizationStatus.AUTH,
};

const mockStore = configureStore([]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window.Intl.DateTimeFormat as any) = class {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  format() {}
};

describe(`Place property work tests`, () => {
  it(`Map render the same active pin that get to place property`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`
      },
    });

    const placeProperty = mount(
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
    );

    const placePropertyComponent = placeProperty.find(PlaceProperty);
    const placePropertyActiveOffer = placePropertyComponent.props().offer;
    const placePropertyActiveOfferCoordinates = placePropertyActiveOffer.coordinates;

    const map = placeProperty.find(Map);
    const mapActivePin = map.props().pins.find((pin) => pin.isActive);
    const mapActivePinCoordinates = mapActivePin.coordinates;

    expect(placePropertyActiveOfferCoordinates).toBe(mapActivePinCoordinates);
  });

  it(`Place property mount should get reviews on correct id`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`
      },
    });

    mount(
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
    );

    expect(props.getPropertyOfferInfo).toHaveBeenCalled();
    expect(props.getPropertyOfferInfo).toHaveBeenCalledWith(3);
  });

  it(`Place property favorite button click should to callback`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`
      },
    });

    const property = mount(
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
    );

    const placePropertyComponent = property.find(PlaceProperty);
    const favoriteButton = placePropertyComponent.find(`.property__bookmark-button`);
    favoriteButton.simulate(`click`, {
      preventDefault: noop
    });

    expect(props.setPropertyFavorite).toHaveBeenCalledTimes(1);
    expect(props.setPropertyFavorite).toHaveBeenCalledWith(props.offer.id, Number(!props.offer.favourite));
  });

  it(`Place property not render when offers null`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`
      },
    });

    const placeProperty = mount(
        <Provider store={store}>
          <BrowserRouter>
            <PlaceProperty
              {...propsWithoutOffer}
            />
          </BrowserRouter>
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    const component = placeProperty.find(`.page__main--property`);
    expect(placeProperty.contains(component)).toBe(false);
  });


});

