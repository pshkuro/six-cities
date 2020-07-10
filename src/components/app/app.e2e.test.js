import {mount} from "enzyme";
import React from "react";
import {App} from "../app/app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceProperty from "../place-property/place-property.jsx";
import Main from "../main/main.jsx";

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
        id: 8989,
      }],
  },
  nearOffers: [
    {
      previewImage: `img/apartment-01.jpg`,
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
        id: 12,
      },
      id: 112},
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
      id: 12},
  ],
  activeOffer: null,
  propertyOffer: null,
  step: `main`,
  onAdvertCardTitleClick: jest.fn(),
  getOffers: jest.fn(),
  error: false,
  login: jest.fn(),
  authorizationStatus: `AUTH`,
};

const mockOffers = {
  offers: [
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
    },
    {
      city: `Cologne`,
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
    },
  ]
};

const mockStore = configureStore([]);

window.Intl.DateTimeFormat = class {
  format() {}
};

describe(`App render right page depending on type`, () => {

  it(`App render main page when page type - main`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: mockOffers,
      USER: {
        profile: {},
      }
    });

    const appComponent = mount(
        <Provider store={store}>
          <App {...props} />
        </Provider>
    );

    expect(appComponent.contains(Main)).toBe(true);
  });

  it(`App render place property page when page type - details`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: mockOffers,
      USER: {
        profile: {},
      }
    });

    const activeOffer = {
      pictures: [`img/apartment-05.jpg`],
      premium: true,
      cost: 11,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 2,
      title: `Place cool`,
      bedrooms: 1,
      guests: 1,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 909,
    };

    const appComponent = mount(
        <Provider store = {store}>
          <App
            {...props}
            step = {`details`}
            propertyOffer = {activeOffer}
          />
        </Provider>
    );

    expect(appComponent.contains(PlaceProperty)).toBe(true);
  });

  it(`Should dispatch at advertCardTitle click`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: mockOffers,
      USER: {
        profile: {},
      }
    });

    const appComponent = mount(
        <Provider store={store}>
          <App {...props} />
        </Provider>
    );

    const advertCardTitle = appComponent.find(`.place-card__name`).first();
    advertCardTitle.simulate(`click`);


    expect(props.onAdvertCardTitleClick).toHaveBeenCalledTimes(1);
  });
});

