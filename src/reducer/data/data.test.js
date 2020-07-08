import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api.js";
import {reducer, ActionType, ActionCreator, Operation} from "./data.js";
import {nearOffers} from "../../mocks/near-offers";
import {mockOffers, cityOffers} from "./data-mock.js";

const offers = [
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
];


const initialState = {
  offers: null,
  nearOffers,
  cities: null,
  error: false,
};

const api = createAPI(() => {});

describe(`Data Reducer Actions to get data work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      offers: null,
      nearOffers,
      cities: null,
      error: false,
    });
  });

  it(`The reducer get offers when page mount`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_OFFERS,
      availableOffers: offers,
    })).toEqual(Object.assign(initialState, {
      offers,
    }));
  });

  it(`Action creators of get offers returns correct action`, () => {
    expect(ActionCreator.getOffers(offers)).toEqual({
      type: ActionType.GET_OFFERS,
      availableOffers: offers,
    });
  });

  it(`Action creators of error returns correct action`, () => {
    expect(ActionCreator.offersLoadError()).toEqual({
      type: ActionType.LOAD_ERROR,
      error: true,
    });
  });
});

describe(`Data Reducer operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.getOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockOffers, {});

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          availableOffers: cityOffers,
        });
      });
  });
});
