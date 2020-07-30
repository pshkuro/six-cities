import * as React from "react";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {App} from "./app";
import {createAPI} from "../../api/api";
import ErrorComponent from "../error/error";
import FavoriteOffers from "../favorite/favorite-offers/favorite-offers";
import Main from "../main/main";
import {noop} from "../../utils/common";
import PlaceProperty from "../place-property/place-property";
import SignIn from "../sign-in/sign-in";

const props = {
  offers: {
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
        id: 5,
      }],
  },
  activeOffer: null,
  error: false,
  login: jest.fn(),
  authorizationStatus: `AUTH`,
};

const api = createAPI(noop);
const middlwares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlwares);

const mockAppStore = mockStore({
  PAGE: {
    city: `Moscow`,
  },
  OFFERS_DATA: {
    error: false,
    offers: [props.offers],
    nearOffers: props.offers,
  },
  USER: {
    profile: {},
    authorizationStatus: `AUTH`,
  },
  REVIEWS: {
    reviews: []
  },
  OFFERS_FAVORITES: {
    favorites: [
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
  },
});

interface MockComponentProps {
  children: React.ReactNode;
}

// Mock BrouserRouter to memory router work
import * as rrd from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(rrd as any).BrowserRouter = function rrdRouter({children}: MockComponentProps) {
  return <div>{children}</div>;
};
module.exports = rrd;


describe(`App render tests`, () => {
  it(`App show Error component when error`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: {
        error: true,
      },
      USER: {
        profile: {},
        authorizationStatus: `AUTH`,
      }
    });

    const component = mount(
        <Provider store={store}>
          <BrowserRouter>
            <App
              {...props}
              error={true}/>
          </BrowserRouter>
        </Provider>
    );

    expect(component.exists(ErrorComponent)).toBe(true);


  });
});

describe(`App routing tests`, () => {
  it(`Invalid path should redirect to ErrorComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries = {[`/random`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(ErrorComponent)).toHaveLength(1);
  });

  it(`Valid main path should redirect to MainComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries = {[`/`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(Main)).toHaveLength(1);

  });

  it(`Valid property path should redirect to PropertyComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter
            initialEntries={[`/offer/5`]}>
            <App
              {...props}/>
          </MemoryRouter>
        </Provider>
    );


    expect(component.find(PlaceProperty)).toHaveLength(1);
  });

  it(`Valid sign in path should redirect to SignInComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter
            initialEntries={[`/login`]}>
            <App
              {...props}
              authorizationStatus="NO_AUTH"/>
          </MemoryRouter>
        </Provider>
    );

    expect(component.find(SignIn)).toHaveLength(1);
  });

  it(`Valid favorite path should redirect to FavoriteComponent`, () => {
    const component = mount(
        <Provider store={mockAppStore}>
          <MemoryRouter initialEntries={[`/favorites`]}>
            <App
              {...props}
              authorizationStatus="AUTH"/>
          </MemoryRouter>
        </Provider>
    );


    expect(component.find(FavoriteOffers)).toHaveLength(1);
  });
});
