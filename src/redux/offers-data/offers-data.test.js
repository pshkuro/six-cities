import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {reducer, ActionType, ActionCreator, Operation} from "./offers-data";
import {noop} from "../../utils/common";

const cityOffers = [
  {"city": `Amsterdam`,
    "cityCoordinates":
    {"coordinates": [52.37454, 4.897976], "zoom": 13},
    "offers": [
      {"bedrooms": 1,
        "conveniences": [`Breakfast`, `Washer`, `Baby seat`, `Air conditioning`, `Dishwasher`, `Fridge`, `Laptop friendly workspace`, `Towels`],
        "coordinates": [52.364540000000005, 4.9019759999999994],
        "cost": 170,
        "description": [`This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`],
        "guests": 2,
        "id": 1,
        "owner":
      {"avatar": `img/avatar-angelina.jpg`,
        "name": `Angelina`,
        "pro": true,
        "id": 25},
        "pictures": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`], "previewImage": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
        "premium": false,
        "favourite": false,
        "rating": 4.1,
        "title": `The house among olive `, "type": `room`}]},
  {"city": `Brussels`,
    "cityCoordinates": {"coordinates": [50.846557, 4.351697], "zoom": 13},
    "offers": [{"bedrooms": 1, "conveniences": [`Washer`, `Air conditioning`, `Towels`, `Breakfast`, `Baby seat`, `Fridge`, `Laptop friendly workspace`],
      "coordinates": [50.862556999999995, 4.375697], "cost": 170,
      "description": [`Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`], "guests": 3, "id": 2, "owner": {"avatar": `img/avatar-angelina.jpg`, "name": `Angelina`, "pro": true, "id": 25}, "pictures": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`], "previewImage": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
      "premium": true, "favourite": false,
      "rating": 2.8, "title": `Penthouse, 4-5 rooms + 5 balconies`, "type": `room`}]}
];

const mockOffers = [{
  "city": {
    "name": `Amsterdam`,
    "location": {
      "latitude": 52.37454,
      "longitude": 4.897976,
      "zoom": 13
    }
  },
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`
  ],
  "title": `The house among olive `,
  "is_favorite": false,
  "is_premium": false,
  "rating": 4.1,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 2,
  "price": 170,
  "goods": [
    `Breakfast`,
    `Washer`,
    `Baby seat`,
    `Air conditioning`,
    `Dishwasher`,
    `Fridge`,
    `Laptop friendly workspace`,
    `Towels`
  ],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
  "location": {
    "latitude": 52.364540000000005,
    "longitude": 4.9019759999999994,
    "zoom": 16
  },
  "id": 1
},
{
  "city": {
    "name": `Brussels`,
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    }
  },
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`
  ],
  "title": `Penthouse, 4-5 rooms + 5 balconies`,
  "is_favorite": false,
  "is_premium": true,
  "rating": 2.8,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 3,
  "price": 170,
  "goods": [
    `Washer`,
    `Air conditioning`,
    `Towels`,
    `Breakfast`,
    `Baby seat`,
    `Fridge`,
    `Laptop friendly workspace`
  ],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`,
  "location": {
    "latitude": 50.862556999999995,
    "longitude": 4.375697,
    "zoom": 16
  },
  "id": 2
}];

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
  nearOffers: null,
  error: false,
};

const api = createAPI(noop);

describe(`Data Reducer Actions to get data work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      offers: null,
      nearOffers: null,
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

  it(`The reducer set offers return correct offers`, () => {
    expect(reducer(initialState, {
      type: ActionType.SET_OFFERS,
      offers,
    })).toEqual(Object.assign(initialState, {
      offers,
    }));
  });

  it(`The reducer get near offers return correct offers`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_NEAR_OFFERS,
      nearOffers: cityOffers[0],
    })).toEqual(Object.assign(initialState, {
      nearOffers: Array(cityOffers[0]),
    }));
  });

  it(`The reducer set near offers return correct offers`, () => {
    expect(reducer(initialState, {
      type: ActionType.SET_NEAR_OFFERS,
      nearOffers: offers,
    })).toEqual(Object.assign(initialState, {
      nearOffers: offers,
    }));
  });

  it(`The reducer load error return correct error`, () => {
    expect(reducer(initialState, {
      type: ActionType.LOAD_ERROR,
      error: true,
    })).toEqual(Object.assign(initialState, {
      error: true,
    }));
  });

  it(`Action creators of get offers returns correct action`, () => {
    expect(ActionCreator.getOffers(offers)).toEqual({
      type: ActionType.GET_OFFERS,
      availableOffers: offers,
    });
  });

  it(`Action creators set offers returna correct action`, () => {
    expect(ActionCreator.setOffers(offers)).toEqual({
      type: ActionType.SET_OFFERS,
      offers,
    });
  });

  it(`Action creators of error returns correct action`, () => {
    expect(ActionCreator.offersLoadError()).toEqual({
      type: ActionType.LOAD_ERROR,
      error: true,
    });
  });

  it(`Action get near offers return a correct action`, () => {
    expect(ActionCreator.getNearOffer(cityOffers[0])).toEqual({
      type: ActionType.GET_NEAR_OFFERS,
      nearOffers: cityOffers[0],
    });
  });

  it(`Action set near offers return a correct action`, () => {
    expect(ActionCreator.setNearOffers(offers)).toEqual({
      type: ActionType.SET_NEAR_OFFERS,
      nearOffers: offers,
    });
  });
});

describe(`Data Reducer operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.getOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, mockOffers, {});

    return offersLoader(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          availableOffers: cityOffers,
        });
      });
  });
  it(`Should make a correct API call to /hotels/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const mockId = 6;
    const dispatch = jest.fn();
    const getNearOffers = Operation.getNearOffers(mockId);

    apiMock
      .onGet(`/hotels/${mockId}/nearby`)
      .reply(200, [mockOffers[0]], {});

    return getNearOffers(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.GET_NEAR_OFFERS,
          nearOffers: cityOffers[0],
        });
      });
  });
});
